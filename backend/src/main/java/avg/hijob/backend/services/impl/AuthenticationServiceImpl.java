package avg.hijob.backend.services.impl;

import avg.hijob.backend.entities.*;
import avg.hijob.backend.enums.AuthenticationResponseEnum;
import avg.hijob.backend.enums.TokenTypeForgotPasswordEnum;
import avg.hijob.backend.repositories.PasswordResetTokenRepository;
import avg.hijob.backend.repositories.RoleRepository;
import avg.hijob.backend.repositories.UserRepository;
import avg.hijob.backend.requests.auth.AuthenticationRequest;
import avg.hijob.backend.responses.GetCurrentUserByAccessTokenResponse;
import avg.hijob.backend.requests.auth.RegisterRequest;
import avg.hijob.backend.responses.AuthenticationResponse;
import avg.hijob.backend.responses.MessageResponse;
import avg.hijob.backend.services.AuthenticationService;
import avg.hijob.backend.services.EmailService;
import avg.hijob.backend.services.JwtService;
import avg.hijob.backend.services.TokenService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.Date;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private static final Logger log = LoggerFactory.getLogger(AuthenticationServiceImpl.class);
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;
    private final TokenService tokenService;

    private void setPasswordResetToken(User user, TokenTypeForgotPasswordEnum tokenType, String token) {
        long expiration = 24 * 60 * 60 * 1000;
        PasswordResetToken passwordResetToken = new PasswordResetToken();
        passwordResetToken.setToken(token);
        Timestamp expiryDate = new Timestamp(new Date().getTime() + expiration);
        passwordResetToken.setExpiryDate(expiryDate);
        passwordResetToken.setUser(user);
        passwordResetToken.setType(tokenType.value);
        passwordResetTokenRepository.save(passwordResetToken);
    }

    @Override
    public AuthenticationResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return AuthenticationResponse.builder()
                    .type(AuthenticationResponseEnum.EMAIL_ALREADY_REGISTERED)
                    .build();
        }

        Role role = roleRepository.findById(request.getRole())
                .orElse(roleRepository.findFirstByOrderByIdAsc());

        User user = new User();
        user.setActive(false);
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(role);
        userRepository.save(user);

        String token = "AVG_" + UUID.randomUUID() + System.currentTimeMillis() + "_HIJOB";
        setPasswordResetToken(user, TokenTypeForgotPasswordEnum.EMAIL_VERIFICATION, token);

        try {
            emailService.sendEmailRegister(user.getEmail(), user.getFullName(), token);
        } catch (Exception e) {
            System.out.println("error Send Mail : " + e.getMessage());
        }

        AuthenticationResponse response = new AuthenticationResponse();
        response.setRefreshToken(null);
        response.setAccessToken(null);
        response.setType(AuthenticationResponseEnum.OK);

        return response;
    }

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();

        CustomUserDetail customUserDetail = new CustomUserDetail(user);
        if(!customUserDetail.isEnabled()){
            return AuthenticationResponse.builder()
                    .type(AuthenticationResponseEnum.ACCOUNT_NOT_ACTIVATED)
                    .build();
        }

        var jwtToken = jwtService.generateToken(customUserDetail, request.isRememberMe());
        var refreshToken = jwtService.generateRefreshToken(customUserDetail);

        tokenService.revokedAllUserTokens(user);
        tokenService.saveUserToken(user,jwtToken);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .name(user.getFullName())
                .role(user.getRole().getName())
                .type(AuthenticationResponseEnum.OK)
                .build();
    }

    @Override
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if(authHeader == null || !authHeader.startsWith("Bearer")){
            return;
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);
        if(userEmail != null){
            User user = userRepository.findByEmail(userEmail).orElseThrow();
            CustomUserDetail customUserDetail = new CustomUserDetail(user);
            if (jwtService.isTokenValid(refreshToken,customUserDetail)){
                var accessToken = jwtService.generateToken(customUserDetail);
                tokenService.revokedAllUserTokens(user);
                tokenService.saveUserToken(user,accessToken);
                var authResponse = AuthenticationResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }

    @Override
    public MessageResponse confirm(String token) {
        PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByToken(token).orElseThrow();
        if (passwordResetToken.getExpiryDate().before(new Date())) {
            return MessageResponse.builder()
                    .type(HttpStatus.BAD_REQUEST)
                    .message("Token is expired")
                    .build();
        }

        passwordResetToken.setActivated(true);
        passwordResetToken.getUser().setActive(true);
        passwordResetTokenRepository.save(passwordResetToken);

        return MessageResponse.builder()
                .type(HttpStatus.OK)
                .message("Verify Successfully")
                .build();
    }

    @Override
    public GetCurrentUserByAccessTokenResponse getCurrentUserByAccessToken(String token) {
        User user = tokenService.getUserByToken(token);
        return GetCurrentUserByAccessTokenResponse.builder()
                .fullName(user.getFullName())
                .role(user.getRole().getName())
                .build();
    }

    @Override
    public MessageResponse forgotPassword(String email) {
        if (email == null || email.isEmpty()) {
            return MessageResponse.builder()
                    .type(HttpStatus.BAD_REQUEST)
                    .message("Email is required")
                    .build();
        }

        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            return MessageResponse.builder()
                    .type(HttpStatus.BAD_REQUEST)
                    .message("Email not found")
                    .build();
        }
        String token = "AVG_" + UUID.randomUUID() + System.currentTimeMillis() + "_HIJOB";
        setPasswordResetToken(user, TokenTypeForgotPasswordEnum.PASSWORD_RESET, token);

        try {
            emailService.sendEmailForgotPassword(user.getEmail(), user.getFullName(), token);
        } catch (Exception e) {
            System.out.println("error Send Mail : " + e.getMessage());
            return MessageResponse.builder()
                    .type(HttpStatus.BAD_REQUEST)
                    .message("Error Send Mail")
                    .build();
        }

        return MessageResponse.builder()
                .type(HttpStatus.OK)
                .message("Email sent successfully")
                .build();
    }

    @Override
    public MessageResponse changePassword(String token, String password) {
        if (token == null || token.isEmpty() || password == null || password.isEmpty()) {
            return MessageResponse.builder()
                    .type(HttpStatus.BAD_REQUEST)
                    .message("Token and password is required")
                    .build();
        }

        PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByToken(token).orElse(null);
        if (passwordResetToken == null
                || passwordResetToken.getExpiryDate().before(new Date())
                || passwordResetToken.isActivated()
        ) {
            return MessageResponse.builder()
                    .type(HttpStatus.BAD_REQUEST)
                    .message("Token is invalid or expired or used")
                    .build();
        }

        User user = passwordResetToken.getUser();
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
        passwordResetToken.setActivated(true);
        passwordResetTokenRepository.save(passwordResetToken);

        return MessageResponse.builder()
                .type(HttpStatus.OK)
                .message("Password reset successfully")
                .build();
    }
}
