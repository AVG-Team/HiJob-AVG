package avg.hijob.backend.controllers;

import avg.hijob.backend.responses.ResponseHandler;
import avg.hijob.backend.responses.ResponseSkill;
import avg.hijob.backend.services.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/skill")
@RequiredArgsConstructor
public class SkillController {

    private final SkillService skillService;

    @GetMapping("")
    public ResponseEntity<Object> getAllSkill() {
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, skillService.getAllSkills());
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllSkills() {
        String message = "";
        try {
            List<ResponseSkill> skills = skillService.getAllSkills();
            message = "Skills retrieved successfully";
            return ResponseHandler.responseOk(message, skills);
        } catch (Exception e) {
            message = "Error retrieving skills";
            return ResponseHandler.responseBadRequest(message);
        }
    }
}