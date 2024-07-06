package avg.hijob.backend.controllers;

import avg.hijob.backend.responses.ResponseHandler;
import avg.hijob.backend.services.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/skill")
@RequiredArgsConstructor
public class SkillController {

    private final SkillService skillService;

    @GetMapping("")
    public ResponseEntity<Object> getAllSkills() {
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, skillService.getAllSkills());
    }
}