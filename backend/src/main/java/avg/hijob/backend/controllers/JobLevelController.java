package avg.hijob.backend.controllers;

import avg.hijob.backend.requests.RequestJobLevelDetail;
import avg.hijob.backend.responses.ResponseHandler;
import avg.hijob.backend.services.JobLevelDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/create")
    public ResponseEntity<Object> create(@RequestBody RequestJobLevelDetail request) {
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK,
                jobLevelDetailService.createJobLevelDetail(request));
    }
}
