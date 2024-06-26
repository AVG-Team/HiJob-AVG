package avg.hijob.backend.controllers;

import avg.hijob.backend.enums.AuthenticationResponseEnum;
import avg.hijob.backend.request.AuthenticationRequest;
import avg.hijob.backend.request.ConfirmEmailRequest;
import avg.hijob.backend.request.RegisterRequest;
import avg.hijob.backend.responses.AuthenticationResponse;
import avg.hijob.backend.responses.MessageResponse;
import avg.hijob.backend.responses.ResponseHandler;
import avg.hijob.backend.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {
    private static final Logger log = LoggerFactory.getLogger(AuthController.class);
    private final AuthenticationService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request
    ) {
        String message = "";
        try {
            AuthenticationResponse authResponse = authService.register(request);
            if (authResponse.getType() == AuthenticationResponseEnum.EMAIL_ALREADY_REGISTERED) {
                message = "Account is already registered";
                return ResponseHandler.responseBuilder(message, HttpStatus.UNAUTHORIZED);
            }
            message = "Account registered successfully";
            return ResponseHandler.responseOk(message, authResponse);
        } catch (DisabledException e) {
            message = "Account is already registered";
            return ResponseHandler.responseBuilder(message, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        String message = "";
        try {
            AuthenticationResponse authResponse = authService.authenticate(request);
            if (authResponse.getType() == AuthenticationResponseEnum.ACCOUNT_NOT_ACTIVATED) {
                message = "Account is not activated";
                return ResponseHandler.responseBadRequest(message);
            }

            message = "Account authenticated successfully";
            return ResponseHandler.responseOk(message, authResponse);
        } catch (DisabledException e) {
            message = "Account is not activated";
            return ResponseHandler.responseBadRequest(message);
        } catch (Exception e) {
            message = "Account or password is incorrect";
            return ResponseHandler.responseBuilder(message, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/confirm-email")
    public ResponseEntity<?> confirm(
            @RequestBody ConfirmEmailRequest request
    ) {
        MessageResponse authResponse = authService.confirm(request.getToken());
        return ResponseHandler.responseBuilder(authResponse.getMessage(), authResponse.getType());
    }
}
