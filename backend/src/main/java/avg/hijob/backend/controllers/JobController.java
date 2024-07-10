package avg.hijob.backend.controllers;

import avg.hijob.backend.repoElastic.JobLevelDetailElasticRepository;
import avg.hijob.backend.repoElastic.JobSkillDetailElasticRepository;
import avg.hijob.backend.repoElastic.JobTypeDetailElasticRepository;
import avg.hijob.backend.requests.RequestJob;
import avg.hijob.backend.repoElastic.JobElasticRepository;
import avg.hijob.backend.repositories.JobRepository;
import avg.hijob.backend.responses.ResponseHandler;
import avg.hijob.backend.services.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.sql.Timestamp;
import java.util.Optional;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;
    private final JobRepository jobRepository;
    private final JobLevelDetailElasticRepository jobLevelDetailElasticRepository;
    private final JobSkillDetailElasticRepository jobSkillDetailElasticRepository;
    private final JobTypeDetailElasticRepository jobTypeDetailElasticRepository;
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
       String decodedField = URLDecoder.decode(field.orElse(""), StandardCharsets.UTF_8);
       Pageable pageable = PageRequest.of(pageNo.orElse(0),pageSize.orElse(9));
       return ResponseHandler.responseBuilder("Complete", HttpStatus.OK,  jobElasticRepository.findByTitleContaining(decodedField,pageable));
    }

    @GetMapping("/elastic")
    public ResponseEntity<Object> dbJob1(
            @RequestParam(name = "pageNo", value="pageNo") Optional<Integer> pageNo,
            @RequestParam(name = "pageSize", value="pageSize") Optional<Integer> pageSize
    ){
        Pageable pageable = PageRequest.of(pageNo.orElse(0),pageSize.orElse(9));
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK,  jobTypeDetailElasticRepository.findAll(pageable));
    }

    @GetMapping("/getJobByCompany/{companyId}")
    public ResponseEntity<Object> getAllJobs(
            @PathVariable Optional<String> companyId,
            @RequestParam(name = "pageNo", value="pageNo") Optional<Integer> pageNo,
            @RequestParam(name = "pageSize", value="pageSize") Optional<Integer> pageSize
    ){
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, jobService.getAllJobsByCompany(companyId,pageSize,pageNo) );
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



    @GetMapping("/filter")
    public ResponseEntity<Object> findJobsFilter(
            @RequestParam(name = "jobSkill",defaultValue = "") String jobSkill,
            @RequestParam(name = "jobLevel", defaultValue = "") String jobLevel,
            @RequestParam(name = "jobType",  defaultValue = "") String jobType,
            @RequestParam(name = "contractType",  defaultValue = "") String contractType,
            @RequestParam(name = "pageNo", defaultValue = "0") Optional<Integer> pageNo,
            @RequestParam(name = "pageSize", defaultValue = "3") Optional<Integer> pageSize
    ) {

        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, jobService.mappingJobs( jobSkill,  jobLevel,jobType, contractType, pageNo, pageSize));
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



}
