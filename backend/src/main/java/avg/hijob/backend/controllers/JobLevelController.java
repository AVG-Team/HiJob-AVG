package avg.hijob.backend.controllers;

import avg.hijob.backend.responses.ResponseHandler;
import avg.hijob.backend.services.JobLevelDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/jobLevel")
@RequiredArgsConstructor
public class JobLevelController {

    private final JobLevelDetailService jobLevelDetailService;

    @GetMapping("/{jobId}")
    public ResponseEntity<Object> getLevelsByJobId(@PathVariable String jobId) {
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK,
                jobLevelDetailService.getAllJobLevelsByJobId(jobId));
    }
}
