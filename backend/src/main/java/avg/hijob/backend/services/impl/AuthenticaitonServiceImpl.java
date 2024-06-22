package avg.hijob.backend.services.impl;

import avg.hijob.backend.entities.CustomUserDetail;
import avg.hijob.backend.entities.Role;
import avg.hijob.backend.entities.Token;
import avg.hijob.backend.entities.User;
import avg.hijob.backend.enums.AuthenticationResponseEnum;
import avg.hijob.backend.enums.TokenTypeEnum;
import avg.hijob.backend.repositories.RoleRepository;
import avg.hijob.backend.repositories.TokenRepository;
import avg.hijob.backend.repositories.UserRepository;
import avg.hijob.backend.request.AuthenticationRequest;
import avg.hijob.backend.request.ForgotPasswordRequest;
import avg.hijob.backend.request.RegisterRequest;
import avg.hijob.backend.responses.AuthenticationResponse;
import avg.hijob.backend.responses.ForgotPasswordResponse;
import avg.hijob.backend.services.AuthenticationService;
import avg.hijob.backend.services.JwtService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticaitonServiceImpl implements AuthenticationService {

    private static final Logger log = LoggerFactory.getLogger(AuthenticaitonServiceImpl.class);
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthenticationResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return AuthenticationResponse.builder()
                    .type(AuthenticationResponseEnum.EMAIL_ALREADY_REGISTERED)
                    .build();
        }

        Role role = roleRepository.findById(request.getRole())
                .orElse(roleRepository.findFirstByOrderByIdAsc());

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .isActive(false)
                .build();
        userRepository.save(user);

        return AuthenticationResponse.builder()
                .accessToken(null)
                .refreshToken(null)
                .type(AuthenticationResponseEnum.OK)
                .build();
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

        var jwtToken = jwtService.generateToken(customUserDetail);
        var refreshToken = jwtService.generateRefreshToken(customUserDetail);

        revokedAllUserTokens(user);
        saveUserToken(user,jwtToken);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .type(AuthenticationResponseEnum.OK)
                .build();
    }

    @Override
    public ForgotPasswordResponse forgotPassword(ForgotPasswordRequest request) {
        return null;
    }

    @Override
    public boolean verifyResetPasswordToken(ForgotPasswordRequest request) {
        return false;
    }

    @Override
    public ForgotPasswordResponse setPassword(ForgotPasswordRequest request) {
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
}
