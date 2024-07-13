package avg.hijob.backend.controllers;

import avg.hijob.backend.requests.RequestCompany;
import avg.hijob.backend.requests.RequestRecruitment;
import avg.hijob.backend.responses.ResponseHandler;
import avg.hijob.backend.responses.ResponseRecruitment;
import avg.hijob.backend.services.RecruitmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/recruitment")
@RequiredArgsConstructor
public class RecruitmentController {
    @Autowired
    private final RecruitmentService recruitmentService;

    @GetMapping("")
    public ResponseEntity<Object> getAllRecruitments(Optional<Integer> page, Optional<Integer> size, Optional<String> q){
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, recruitmentService.getAllRecruitments(size, page,q));
    }

    @GetMapping("/getRecruitmentByUserId/{userId}")
    public ResponseEntity<Object> getRecruitmentByUserId(@PathVariable  String userId) {
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, recruitmentService.getRecruitmentByUserId(userId));
    }

    @GetMapping("/getRecruitmentById/{recruitmentId}")
    public ResponseEntity<Object> getRecruitmentById(@PathVariable String recruitmentId) {
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, recruitmentService.getRecruitmentById(recruitmentId));
    }

    @GetMapping("/getRecruitmentByJobId/{jobId}")
    public ResponseEntity<Object> getRecruitmentByJobId(@PathVariable String jobId) {
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, recruitmentService.getRecruitmentByJobId(jobId));
    }

    @GetMapping("/getRecruitmentByJobIdAndUserId/{jobId}/{userId}")
    public ResponseEntity<Object> getRecruitmentByJobIdAndUserId(@PathVariable String jobId, @PathVariable String userId) {
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, recruitmentService.getRecruitmentByJobIdAndUserId(jobId, userId));
    }

    @PostMapping("/createRecruitment")
    public ResponseEntity<Object> createRecruitment(@ModelAttribute RequestRecruitment requestRecruitment) {
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, recruitmentService.createRecruitment(requestRecruitment));
    }

    @PutMapping("/updateRecruitment/{id}")
    public ResponseEntity<Object> updateRecruitment(@PathVariable String id, @RequestBody RequestRecruitment requestRecruitment){
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, recruitmentService.updateRecruitment(id, requestRecruitment));
    }

    @PutMapping("/deleteRecruitment/{recruitmentId}")
    public ResponseEntity<Object> deleteRecruitment(@PathVariable String recruitmentId) {
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, recruitmentService.deleteRecruitment(recruitmentId));
    }
}
