package avg.hijob.backend.controllers;

import avg.hijob.backend.entities.Job;
import avg.hijob.backend.entities.JobLevelDetail;
import avg.hijob.backend.repoElastic.*;
import avg.hijob.backend.repositories.JobLevelDetailRepository;
import avg.hijob.backend.repositories.JobRepository;
import avg.hijob.backend.responses.ResponseHandler;
import avg.hijob.backend.services.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

    @GetMapping("/all")
    @GetMapping("/getJobByCompany/{companyId}")
    public ResponseEntity<Object> getAllJobs(
            @PathVariable Optional<String> companyId,
            @RequestParam(name = "pageNo", value="pageNo") Optional<Integer> pageNo,
            @RequestParam(name = "pageSize", value="pageSize") Optional<Integer> pageSize
    ){
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, jobRepository.findAllCus(PageRequest.of(pageNo.orElseThrow(), pageSize.orElseThrow())) );
    }



   @GetMapping("/elastic/all")
    public ResponseEntity<Object> dbJob(
            @RequestParam(name ="field",value = "") Optional<String> field,
            @RequestParam(name = "pageNo", value="pageNo") Optional<Integer> pageNo,
            @RequestParam(name = "pageSize", value="pageSize") Optional<Integer> pageSize
    ){
        Pageable pageable = PageRequest.of(pageNo.orElse(0),pageSize.orElse(9));
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK,  jobElasticRepository.findAll(pageable));
    }


    @GetMapping
    public ResponseEntity<Object> findJobsFilter(
            @RequestParam(name ="jobSkill",value = "") Optional<String> jobSkill,
            @RequestParam(name ="jobLevel",value = "") Optional<String> jobLevel,
            @RequestParam(name ="jobType",value = "") Optional<String> jobType,
            @RequestParam(name ="contractType",value = "") Optional<String> contractType,
            @RequestParam(name = "pageNo", value="pageNo") Optional<Integer> pageNo,
            @RequestParam(name = "pageSize", value="pageSize") Optional<Integer> pageSize
    ){
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, jobService.mappingJobs(jobType, jobSkill, jobLevel, contractType, pageNo, pageSize));
    }

    @GetMapping("/getJobCreateToday")
    public ResponseEntity<Object> getJobsCreateToday(
            @RequestParam(name = "createdDate", value="createdDate") String createdDate
    ){
        Timestamp timeStamp = Timestamp.valueOf(createdDate);
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, jobService.getJobsCreateToday(timeStamp) );
    }

}
