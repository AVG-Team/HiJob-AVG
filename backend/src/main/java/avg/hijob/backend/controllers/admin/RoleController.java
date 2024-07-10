package avg.hijob.backend.controllers.admin;

import avg.hijob.backend.responses.ResponseHandler;
import avg.hijob.backend.services.LevelService;
import avg.hijob.backend.services.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/admin/roles")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    @GetMapping("")
    public ResponseEntity<?> findAllRoles() {
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK,roleService.findAllRoles());
    }

    @GetMapping("/getRoles")
    public ResponseEntity<Object> getAllRole(Optional<Integer> page, Optional<Integer> size, Optional<String> q) {
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, roleService.getAllRole(size,page,q));
    }
}
