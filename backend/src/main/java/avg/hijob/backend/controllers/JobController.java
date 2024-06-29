package avg.hijob.backend.controllers;

import avg.hijob.backend.responses.ResponseHandler;
import avg.hijob.backend.services.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    @GetMapping("/all")
    public ResponseEntity<Object> getAllJobs(
            @RequestParam(name ="companyId",value = "companyId") Optional<String> companyId,
            @RequestParam(name = "pageNo", value="pageNo") Optional<Integer> pageNo,
            @RequestParam(name = "pageSize", value="pageSize") Optional<Integer> pageSize
    ){
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, jobService.getAllJobs(companyId,pageSize,pageNo) );
    }

}
