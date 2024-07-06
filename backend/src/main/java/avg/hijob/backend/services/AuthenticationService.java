package avg.hijob.backend.services;

import avg.hijob.backend.requests.auth.AuthenticationRequest;
import avg.hijob.backend.requests.auth.RegisterRequest;
import avg.hijob.backend.responses.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public interface AuthenticationService {
    AuthenticationResponse register(RegisterRequest request);
    AuthenticationResponse authenticate(AuthenticationRequest request);
    void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException;
    MessageResponse confirm(String token);
    GetCurrentUserByAccessTokenResponse getCurrentUserByAccessToken(String token);
    MessageResponse forgotPassword(String email);
    MessageResponse changePassword(String token, String password);
}
