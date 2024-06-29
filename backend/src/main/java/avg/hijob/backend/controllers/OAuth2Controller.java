package avg.hijob.backend.controllers;

import avg.hijob.backend.entities.CustomUserDetail;
import avg.hijob.backend.enums.AuthenticationResponseEnum;
import avg.hijob.backend.o2auth.request.ConfirmCallbackRequest;
import avg.hijob.backend.responses.AuthenticationResponse;
import avg.hijob.backend.responses.MessageResponse;
import avg.hijob.backend.responses.ResponseHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("api/oauth2")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class OAuth2Controller {
//    @GetMapping("/callback")
//    public ResponseEntity<?> oAuth2Callback() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        if (authentication != null && authentication.isAuthenticated()) {
//            CustomUserDetails principal = (CustomUserDetails) authentication.getPrincipal();
//            // Lấy thông tin từ principal (ví dụ: username, email, ...)
//            String username = principal.getUsername();
//            String email = principal.getEmail();
//        }
//        return ResponseHandler.responseBuilder(authResponse.getMessage(), authResponse.getType());
//    }
}
