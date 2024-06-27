package avg.hijob.backend.services;

import avg.hijob.backend.request.*;
import avg.hijob.backend.responses.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public interface AuthenticationService {
    AuthenticationResponse register(RegisterRequest request);
    AuthenticationResponse authenticate(AuthenticationRequest request);
    MessageResponse forgotPassword(ForgotPasswordRequest request);
    boolean verifyResetPasswordToken(ForgotPasswordRequest request);
    MessageResponse setPassword(ForgotPasswordRequest request);
    void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException;
    MessageResponse confirm(String token);
    GetCurrentUserByAccessTokenResponse getCurrentUserByAccessToken(String token);
}
