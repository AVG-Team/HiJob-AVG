package avg.hijob.backend.controllers;

import avg.hijob.backend.requests.RequestJob;
import avg.hijob.backend.responses.ResponseHandler;
import avg.hijob.backend.services.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Optional;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    @GetMapping("")
    public ResponseEntity<Object> getAllJobs(
            @RequestParam(name = "pageNo", value="pageNo") Optional<Integer> pageNo,
            @RequestParam(name = "pageSize", value="pageSize") Optional<Integer> pageSize
    ){
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, jobService.getAllJobs(pageSize,pageNo) );
    }

    @GetMapping("/getJobByCompany/{companyId}")
    public ResponseEntity<Object> getAllJobs(
            @PathVariable Optional<String> companyId,
            @RequestParam(name = "pageNo", value="pageNo") Optional<Integer> pageNo,
            @RequestParam(name = "pageSize", value="pageSize") Optional<Integer> pageSize
    ){
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, jobService.getAllJobsByCompany(companyId,pageSize,pageNo) );
    }

    @GetMapping("/getJobCreateToday")
    public ResponseEntity<Object> getJobsCreateToday(
            @RequestParam(name = "createdDate", value="createdDate") String createdDate
    ){
        Timestamp timeStamp = Timestamp.valueOf(createdDate);
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, jobService.getJobsCreateToday(timeStamp) );
    }

    @GetMapping("/getJobById/{id}")
    public ResponseEntity<Object> getJobById(
            @PathVariable String id
    ){
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, jobService.getJobById(id) );
    }

    @PostMapping("/createJob")
    public ResponseEntity<Object> create(
            @RequestBody RequestJob requestJob
            ){
        System.out.println("1"+requestJob.toString());
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK,jobService.createJob(requestJob) );
    }

    @PutMapping("/updateJob/{id}")
    public ResponseEntity<Object> update(
            @PathVariable String id,
            @RequestBody RequestJob requestJob
    ){
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK,jobService.updateJob(id,requestJob) );
    }

    @PutMapping("/deleteJob/{id}")
    public ResponseEntity<Object> delete(
            @PathVariable String id
    ){
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK,jobService.deleteJob(id) );
    }

}
