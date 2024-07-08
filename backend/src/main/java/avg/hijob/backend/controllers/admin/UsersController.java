package avg.hijob.backend.controllers.admin;

import avg.hijob.backend.responses.ResponseHandler;
import avg.hijob.backend.responses.UserResponse;
import avg.hijob.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/admin/users")
@RequiredArgsConstructor
public class UsersController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<?> getUsers() {
        List<UserResponse> users = userService.getUsers();
        return ResponseHandler.responseOk("Get Users", users);
    }
}
