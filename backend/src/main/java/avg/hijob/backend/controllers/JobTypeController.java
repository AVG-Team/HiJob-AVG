package avg.hijob.backend.controllers;

import avg.hijob.backend.responses.ResponseHandler;
import avg.hijob.backend.responses.ResponseJobTypeDetail;
import avg.hijob.backend.services.JobTypeDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/jobTypeDetail")
@RequiredArgsConstructor
public class JobTypeController {

    private final JobTypeDetailService jobTypeDetailService;

    @GetMapping("/{jobId}")
    public ResponseEntity<Object> getAllJobTypesByJobId(@PathVariable String jobId) {
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK,
                jobTypeDetailService.getAllJobTypesByJobId(jobId));
    }
}
