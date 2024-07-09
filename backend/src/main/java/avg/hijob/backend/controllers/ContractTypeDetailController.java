package avg.hijob.backend.controllers;

import avg.hijob.backend.requests.RequestContractTypeDetail;
import avg.hijob.backend.responses.ResponseHandler;
import avg.hijob.backend.services.JobContractTypeDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/create")
    public ResponseEntity<Object> create(@RequestBody RequestContractTypeDetail request) {
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK,
                jobContractTypeDetailService.createContractTypeDetail(request));
    }

}
