package avg.hijob.backend.services.impl;

import avg.hijob.backend.entities.*;
import avg.hijob.backend.enums.AuthenticationResponseEnum;
import avg.hijob.backend.enums.TokenTypeEnum;
import avg.hijob.backend.repositories.PasswordResetTokenRepository;
import avg.hijob.backend.repositories.RoleRepository;
import avg.hijob.backend.repositories.TokenRepository;
import avg.hijob.backend.repositories.UserRepository;
import avg.hijob.backend.request.AuthenticationRequest;
import avg.hijob.backend.request.ForgotPasswordRequest;
import avg.hijob.backend.request.RegisterRequest;
import avg.hijob.backend.responses.AuthenticationResponse;
import avg.hijob.backend.responses.MessageResponse;
import avg.hijob.backend.services.AuthenticationService;
import avg.hijob.backend.services.EmailService;
import avg.hijob.backend.services.JwtService;
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
import java.util.Date;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private static final Logger log = LoggerFactory.getLogger(AuthenticationServiceImpl.class);
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final TokenRepository tokenRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

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

        long expiration = 7 * 24 * 60 * 60 * 1000;
        String token = "AVG_" + UUID.randomUUID() + System.currentTimeMillis() + "_HIJOB";
        PasswordResetToken passwordResetToken = new PasswordResetToken();
        passwordResetToken.setToken(token);
        passwordResetToken.setExpiryDate(new Date(System.currentTimeMillis() + expiration));
        passwordResetToken.setUser(user);
        passwordResetTokenRepository.save(passwordResetToken);
        try {
            emailService.sendEmailWithToken(user.getEmail(), user.getFullName(), token);
        } catch (Exception e) {
            System.out.println(e.getMessage());
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

        revokedAllUserTokens(user);
        saveUserToken(user,jwtToken);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .name(user.getFullName())
                .role(user.getRole().getName())
                .type(AuthenticationResponseEnum.OK)
                .build();
    }

    @Override
    public MessageResponse forgotPassword(ForgotPasswordRequest request) {
        return null;
    }

    @Override
    public boolean verifyResetPasswordToken(ForgotPasswordRequest request) {
        return false;
    }

    @Override
    public MessageResponse setPassword(ForgotPasswordRequest request) {
        return null;
    }

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenTypeEnum.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokedAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if(validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
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
                revokedAllUserTokens(user);
                saveUserToken(user,accessToken);
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
}
