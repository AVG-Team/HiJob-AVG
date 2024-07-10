package avg.hijob.backend.controllers;

import avg.hijob.backend.requests.RequestJobType;
import avg.hijob.backend.requests.RequestSkill;
import avg.hijob.backend.responses.ResponseHandler;
import avg.hijob.backend.responses.ResponseJobTypeDetail;
import avg.hijob.backend.responses.ResponseSkill;
import avg.hijob.backend.services.JobTypeDetailService;
import avg.hijob.backend.services.JobTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/jobTypeDetail")
@RequiredArgsConstructor
public class JobTypeController {

    private final JobTypeDetailService jobTypeDetailService;
    private final JobTypeService jobTypeService;

    @GetMapping("/{jobId}")
    public ResponseEntity<Object> getAllJobTypesByJobId(@PathVariable String jobId) {
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK,
                jobTypeDetailService.getAllJobTypesByJobId(jobId));
    }

    @GetMapping("")
    public ResponseEntity<Object> getAllJobType(Optional<Integer> page, Optional<Integer> size, Optional<String> q) {
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, jobTypeService.getAllJobType(size,page,q));
    }

    @GetMapping("/getJobTypeById/{id}")
    public ResponseEntity<Object> getJobTypeById(@PathVariable Integer id){
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, jobTypeService.getJobTypeById(id));
    }

    @PostMapping("/createJobType")
    public ResponseEntity<Object> create(@RequestBody RequestJobType requestJobType){
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, jobTypeService.createJobType(requestJobType));
    }

    @PutMapping("/updateJobType/{id}")
    public ResponseEntity<Object> update(@PathVariable Long id, @RequestBody RequestJobType requestJobType){
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, jobTypeService.updateJobType(id, requestJobType));
    }

    @PutMapping("/deleteJobType/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id){
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, jobTypeService.deleteJobType(id));
    }
}
