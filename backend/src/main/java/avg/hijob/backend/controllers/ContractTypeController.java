package avg.hijob.backend.controllers;

import avg.hijob.backend.responses.ResponseHandler;
import avg.hijob.backend.services.ContractTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contract-type")
@RequiredArgsConstructor
public class ContractTypeController {

    @Autowired
    private final ContractTypeService ContractTypeService;

    @GetMapping("")
    public ResponseEntity<Object> findAllContractTypes() {
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK,ContractTypeService.findAllContractTypes());
    }
}
