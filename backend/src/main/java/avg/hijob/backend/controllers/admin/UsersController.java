package avg.hijob.backend.controllers.admin;

import avg.hijob.backend.entities.User;
import avg.hijob.backend.requests.RequestCompany;
import avg.hijob.backend.requests.user.SearchUsersRequest;
import avg.hijob.backend.requests.user.UpdateProfileRequest;
import avg.hijob.backend.responses.MessageResponse;
import avg.hijob.backend.responses.ResponseHandler;
import avg.hijob.backend.responses.ResponseUsersPage;
import avg.hijob.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("api/admin/users")
@RequiredArgsConstructor
public class UsersController {
    private static final Logger log = LoggerFactory.getLogger(UsersController.class);
    private final UserService userService;

    @GetMapping
    public ResponseEntity<?> getUsers(@ModelAttribute SearchUsersRequest request) {
        ResponseUsersPage users = userService.getUsers(request);
        return ResponseHandler.responseOk("Get User Successfully",users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getUserById(@PathVariable String id){
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, userService.getUserById(id));
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@ModelAttribute UpdateProfileRequest request) {
        System.out.println("request: " + request.getCoverLetter());
        System.out.println("birthdate " + request.getBirthday());
        MessageResponse response = userService.createUser(request);
        return ResponseHandler.responseBuilder(response.getMessage(), response.getType());
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Object> update(@PathVariable String id, @ModelAttribute UpdateProfileRequest request){
        System.out.println("request: " + request.getCoverLetter());
        System.out.println("birthdate " + request.getBirthday());
        MessageResponse response = userService.saveUser(request, id);
        return ResponseHandler.responseBuilder(response.getMessage(), response.getType());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable String id){
        MessageResponse response = userService.deleteUser(id);
        return ResponseHandler.responseBuilder(response.getMessage(), response.getType());
    }
}
