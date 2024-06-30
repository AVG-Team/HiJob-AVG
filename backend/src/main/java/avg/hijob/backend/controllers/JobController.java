package avg.hijob.backend.controllers;

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

    @GetMapping("/getJobByCompany/{companyId}")
    public ResponseEntity<Object> getAllJobs(
            @PathVariable Optional<String> companyId,
            @RequestParam(name = "pageNo", value="pageNo") Optional<Integer> pageNo,
            @RequestParam(name = "pageSize", value="pageSize") Optional<Integer> pageSize
    ){
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, jobService.getAllJobs(companyId,pageSize,pageNo) );
    }

    @GetMapping("/getJobCreateToday")
    public ResponseEntity<Object> getJobsCreateToday(
            @RequestParam(name = "createdDate", value="createdDate") String createdDate
    ){
        Timestamp timeStamp = Timestamp.valueOf(createdDate);
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, jobService.getJobsCreateToday(timeStamp) );
    }

}
