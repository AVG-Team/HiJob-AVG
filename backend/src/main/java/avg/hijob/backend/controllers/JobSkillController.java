package avg.hijob.backend.controllers;

import avg.hijob.backend.requests.RequestJobSkillDetail;
import avg.hijob.backend.responses.ResponseHandler;
import avg.hijob.backend.services.JobSkillDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jobSkill")
@RequiredArgsConstructor
public class JobSkillController {

    private final JobSkillDetailService jobSkillDetailService;

    @GetMapping("/{jobId}")
    public ResponseEntity<Object> getAllJobSkillsByJobId(@PathVariable String jobId) {
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK,
                jobSkillDetailService.getAllJobSkillsByJobId(jobId));
    }

    @PostMapping("/create")
    public ResponseEntity<Object> create(@RequestBody RequestJobSkillDetail request) {
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK,
                jobSkillDetailService.createJobSkillDetail(request));
    }
}
