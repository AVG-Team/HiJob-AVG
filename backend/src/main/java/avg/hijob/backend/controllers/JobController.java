package avg.hijob.backend.controllers;


import avg.hijob.backend.repoElastic.JobElasticRepository;
import avg.hijob.backend.repositories.JobRepository;
import avg.hijob.backend.requests.RequestJob;
import avg.hijob.backend.responses.ResponseHandler;
import avg.hijob.backend.services.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    private final JobRepository jobRepository;

    @Autowired
    private JobElasticRepository jobElasticRepository;

    @GetMapping("")
    public ResponseEntity<Object> getAllJobs(
            @RequestParam(name = "pageNo", value="pageNo") Optional<Integer> pageNo,
            @RequestParam(name = "pageSize", value="pageSize") Optional<Integer> pageSize
    ){
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, jobService.getAllJobs(pageSize,pageNo) );
    }




   @GetMapping("/keyword")
    public ResponseEntity<Object> dbJob(
            @RequestParam(name ="field",value = "") Optional<String> field,
            @RequestParam(name = "pageNo", value="pageNo") Optional<Integer> pageNo,
            @RequestParam(name = "pageSize", value="pageSize") Optional<Integer> pageSize
    ){
        Pageable pageable = PageRequest.of(pageNo.orElse(0),pageSize.orElse(9));
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK,  jobElasticRepository.findByTitleContaining(field.orElse(""),pageable));
    }


    @GetMapping("/filter")
    public ResponseEntity<Object> findJobsFilter(
            @RequestParam(name = "jobSkill", required = false) Optional<String> jobSkill,
            @RequestParam(name = "jobLevel", required = false) Optional<String> jobLevel,
            @RequestParam(name = "jobType", required = false) Optional<String> jobType,
            @RequestParam(name = "contractType", required = false) Optional<String> contractType,
            @RequestParam(name = "pageNo", defaultValue = "0") Optional<Integer> pageNo,
            @RequestParam(name = "pageSize", defaultValue = "3") Optional<Integer> pageSize
    ) {
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, jobService.mappingJobs(jobType, jobSkill, jobLevel, contractType, pageNo, pageSize));
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
            @PathVariable String id){
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, jobService.getJobById(id) );
    }

    @PostMapping("/createJob")
    public ResponseEntity<Object> create(
            @RequestBody RequestJob requestJob
            ){
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
