package avg.hijob.backend.controllers;

import avg.hijob.backend.responses.ResponseHandler;
import avg.hijob.backend.services.JobContractTypeDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contract-type-detail")
@RequiredArgsConstructor
public class ContractTypeDetailController {

    private final JobContractTypeDetailService jobContractTypeDetailService;

    @GetMapping("/{jobId}")
    public ResponseEntity<Object> getAllJobContractTypesByJobId(@PathVariable String jobId) {
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK,
                jobContractTypeDetailService.getAllContractTypesByJobId(jobId));
    }

}
