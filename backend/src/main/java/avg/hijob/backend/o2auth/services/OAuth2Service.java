package avg.hijob.backend.o2auth.services;

import avg.hijob.backend.entities.CustomUserDetail;
import avg.hijob.backend.entities.Role;
import avg.hijob.backend.entities.User;
import avg.hijob.backend.enums.AuthenticationResponseEnum;
import avg.hijob.backend.o2auth.entities.OAuth2UserInfo;
import avg.hijob.backend.o2auth.entities.OAuth2UserInfoFactory;
import avg.hijob.backend.o2auth.enums.AuthProvider;
import avg.hijob.backend.o2auth.exceptions.OAuth2AuthenticationProcessingException;
import avg.hijob.backend.repositories.RoleRepository;
import avg.hijob.backend.repositories.UserRepository;
import avg.hijob.backend.responses.AuthenticationResponse;
import avg.hijob.backend.services.AuthenticationService;
import avg.hijob.backend.services.EmailService;
import avg.hijob.backend.services.JwtService;
import avg.hijob.backend.services.TokenService;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.sun.security.auth.UserPrincipal;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class OAuth2Service extends DefaultOAuth2UserService {
    private static final Logger log = LoggerFactory.getLogger(OAuth2Service.class);
    @Value("${CLIENT_GOOGLE_ID}")
    private String CLIENT_GOOGLE_ID;

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final JwtService jwtService;
    private final TokenService tokenService;

    @PostConstruct
    private void init() {
        if (CLIENT_GOOGLE_ID == null) {
            throw new IllegalArgumentException("CLIENT_GOOGLE_ID environment variable is not set");
        } else {
            System.out.println("CLIENT_GOOGLE_ID successfully loaded");
        }
    }

    public AuthenticationResponse googleLogin(String token) {
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), JacksonFactory.getDefaultInstance())
                .setAudience(Collections.singletonList(CLIENT_GOOGLE_ID))
                .build();

        GoogleIdToken idToken;
        try {
            idToken = verifier.verify(token);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                String userId = payload.getSubject();
                String email = payload.getEmail();
                String name = (String) payload.get("name");

                User user = userRepository.findByEmail(email).orElse(null);
                if (user == null) {
                    Role role = roleRepository.findById(1)
                            .orElse(roleRepository.findFirstByOrderByIdAsc());

                    String password = passwordEncoder.encode("AVG_" + new Random().nextInt(1000) + "_HIJOB");
                    User userRegister = new User();
                    userRegister.setActive(true);
                    userRegister.setEmail(email);
                    userRegister.setPassword(password);
                    userRegister.setRole(role);
                    userRepository.save(userRegister);

                    AuthenticationResponse response = new AuthenticationResponse();
                    try {
                        emailService.sendEmailWithPassword(email, name, password);
                        response.setName(name);
                        response.setRole(role.getName());
                        response.setType(AuthenticationResponseEnum.OK);

                        CustomUserDetail customUserDetail = new CustomUserDetail(user);
                        if(!customUserDetail.isEnabled()){
                            return AuthenticationResponse.builder()
                                    .type(AuthenticationResponseEnum.ACCOUNT_NOT_ACTIVATED)
                                    .build();
                        }

                        var jwtToken = jwtService.generateToken(customUserDetail, true);
                        var refreshToken = jwtService.generateRefreshToken(customUserDetail);

                        tokenService.revokedAllUserTokens(user);
                        tokenService.saveUserToken(user,jwtToken);

                        response.setAccessToken(jwtToken);
                        response.setRefreshToken(refreshToken);
                    } catch (Exception e) {
                        System.out.println(e.getMessage());
                        response.setType(AuthenticationResponseEnum.ACCOUNT_NOT_ACTIVATED);
                    }

                    return response;
                }

                CustomUserDetail customUserDetail = new CustomUserDetail(user);
                if(!customUserDetail.isEnabled()){
                    return AuthenticationResponse.builder()
                            .type(AuthenticationResponseEnum.ACCOUNT_NOT_ACTIVATED)
                            .build();
                }

                var jwtToken = jwtService.generateToken(customUserDetail, true);
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
            } else {
                return AuthenticationResponse.builder()
                        .type(AuthenticationResponseEnum.INVALID_TOKEN)
                        .build();
            }
        } catch (GeneralSecurityException | IOException e) {
            return AuthenticationResponse.builder()
                    .type(AuthenticationResponseEnum.INVALID_TOKEN)
                    .build();
        }
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        System.out.println(oAuth2UserRequest.getAccessToken().getTokenValue());
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (Exception ex) {
            // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());
        System.out.println(oAuth2UserInfo.getEmail());
        System.out.println(oAuth2UserInfo.getId());
        System.out.println(oAuth2UserInfo.getAttributes());
        if(StringUtils.isEmpty(oAuth2UserInfo.getEmail())) {
            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
        }

        Optional<User> userOptional = userRepository.findByEmail(oAuth2UserInfo.getEmail());
        User user;
        user = userOptional.orElseGet(() -> registerNewUser(oAuth2UserInfo));

        return new CustomUserDetail(user, oAuth2User.getAttributes());
    }

    private User registerNewUser(OAuth2UserInfo oAuth2UserInfo) {
        String email = oAuth2UserInfo.getEmail();
        String fullName = oAuth2UserInfo.getName();
        String avatar = oAuth2UserInfo.getImageUrl();

        Role role = roleRepository.findById(1)
                .orElse(roleRepository.findFirstByOrderByIdAsc());

        String password = passwordEncoder.encode("AVG_" + new Random().nextInt(1000) + "_HIJOB");
        User userRegister = new User();
        userRegister.setActive(true);
        userRegister.setEmail(email);
        userRegister.setPassword(password);
        userRegister.setRole(role);
        userRepository.save(userRegister);

        try {
            emailService.sendEmailWithPassword(email, fullName, password);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return userRepository.save(userRegister);
    }
}
