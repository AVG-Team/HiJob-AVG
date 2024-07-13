package avg.hijob.backend.controllers;

import avg.hijob.backend.requests.RequestCompany;
import avg.hijob.backend.requests.RequestSkill;
import avg.hijob.backend.responses.ResponseHandler;
import avg.hijob.backend.responses.ResponseSkill;
import avg.hijob.backend.services.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/skill")
@RequiredArgsConstructor
public class SkillController {

    private final SkillService skillService;

    @GetMapping("")
    public ResponseEntity<Object> getAllSkill(Optional<Integer> page, Optional<Integer> size, Optional<String> q) {
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, skillService.getAllSkill(size,page,q));
    }

    @GetMapping("/getSkillById/{id}")
    public ResponseEntity<Object> getSkillById(@PathVariable Integer id){
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, skillService.getSkillById(id));
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

    @PostMapping("/createSkill")
    public ResponseEntity<Object> create(@RequestBody RequestSkill requestSkill){
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, skillService.createSkill(requestSkill));
    }

    @PutMapping("/updateSkill/{id}")
    public ResponseEntity<Object> update(@PathVariable Long id, @RequestBody RequestSkill requestSkill){
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, skillService.updateSkill(id, requestSkill));
    }

    @PutMapping("/deleteSkill/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id){
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, skillService.deleteSkill(id));
    }
}