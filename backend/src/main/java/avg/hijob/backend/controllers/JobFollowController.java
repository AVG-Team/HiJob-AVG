package avg.hijob.backend.controllers;

import avg.hijob.backend.responses.ResponseHandler;
import avg.hijob.backend.services.JobFollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/job-follows")
public class JobFollowController {

    @Autowired
    private JobFollowService jobFollowService;

    @GetMapping("/")
    public ResponseEntity<Object> findAllJobFollows() {
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK,jobFollowService.findAllJobFollows());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Object> findAllJobFollowsByUserId(@PathVariable String userId) {
        return  ResponseHandler.responseBuilder("Complete", HttpStatus.OK,jobFollowService.findAllJobFollowsByUserId(userId));
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<Object> findAllJobFollowsByJobId(@PathVariable String jobId) {
        return  ResponseHandler.responseBuilder("Complete", HttpStatus.OK,jobFollowService.findAllJobFollowsByJobId(jobId));
    }

    @GetMapping("/{userId}/{jobId}")
    public ResponseEntity<Object> findJobFollowByUserIdAndJobId(@PathVariable String userId, @PathVariable String jobId) {
        return  ResponseHandler.responseBuilder("Complete", HttpStatus.OK,jobFollowService.findJobFollowByUserIdAndJobId(userId, jobId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findJobFollowById(@PathVariable Long id) {
        return  ResponseHandler.responseBuilder("Complete", HttpStatus.OK,jobFollowService.findJobFollowById(id));
    }

    @DeleteMapping("/delete/{userId}/{jobId}")
    public ResponseEntity<Object> deleteJobFollowById(@PathVariable String userId, @PathVariable String jobId) {
        return  ResponseHandler.responseBuilder("Complete", HttpStatus.OK,jobFollowService.deleteJobFollowById(userId, jobId));
    }

    @PostMapping("/create/{userId}/{jobId}")
    public ResponseEntity<Object> createJobFollow(@PathVariable String userId, @PathVariable String jobId) {
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK,jobFollowService.createJobFollow(userId, jobId));
    }



}
