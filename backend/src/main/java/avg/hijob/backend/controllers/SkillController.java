package avg.hijob.backend.controllers;

import avg.hijob.backend.entities.Skill;
import avg.hijob.backend.responses.ResponseHandler;
import avg.hijob.backend.responses.SkillResponse;
import avg.hijob.backend.services.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/skill")
@RequiredArgsConstructor
public class SkillController {
    private final SkillService skillService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllSkills() {
        String message = "";
        try {
            List<SkillResponse> skills = skillService.getAllSkills();
            message = "Skills retrieved successfully";
            return ResponseHandler.responseOk(message, skills);
        } catch (Exception e) {
            message = "Error retrieving skills";
            return ResponseHandler.responseBadRequest(message);
        }
    }
}