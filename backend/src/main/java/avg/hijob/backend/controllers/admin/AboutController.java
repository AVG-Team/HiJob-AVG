package avg.hijob.backend.controllers.admin;

import avg.hijob.backend.entities.About;
import avg.hijob.backend.requests.RequestAbout;
import avg.hijob.backend.responses.MessageResponse;
import avg.hijob.backend.responses.ResponseHandler;
import avg.hijob.backend.services.AboutService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AboutController {
    @Autowired
    private final AboutService aboutService;

    @GetMapping("/about")
    public ResponseEntity<Object> getAbout() {
        About about = aboutService.getAbout();
        if (about == null) {
            return ResponseHandler.responseBuilder("About not found", HttpStatus.NOT_FOUND);
        } else {
            return ResponseHandler.responseOk("Complete", about);
        }
    }

    @PostMapping("/admin/about/save")
    public ResponseEntity<?> saveAbout(@RequestBody RequestAbout request) {
        System.out.println(request);
        MessageResponse response = aboutService.saveAbout(request);
        return ResponseHandler.responseBuilder(response.getMessage(), response.getType());
    }
}
