package avg.hijob.backend.controllers;

import avg.hijob.backend.repositories.JobRepository;
import avg.hijob.backend.responses.ResponseHandler;
import avg.hijob.backend.services.CompanyService;
import avg.hijob.backend.services.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {

    @Autowired
    private CompanyService companyService;
    @GetMapping("/all")
    public ResponseEntity<Object> getAllCompanies(
            @RequestParam(name = "pageNo", value="pageNo") Optional<Integer> pageNo,
            @RequestParam(name = "pageSize", value="pageSize") Optional<Integer> pageSize
    ){
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, companyService.getAllCompanies(pageSize,pageNo) );
    }

    @GetMapping
    public ResponseEntity<?> getAll(
            @RequestParam(value = "page", defaultValue = "0") Optional<Integer> pageNo,
            @RequestParam(value = "size", defaultValue = "3") Optional<Integer> pageSize,
            @RequestParam(value = "filter", required = false) List<String> filters
    ) {
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, companyService.getAllByFilter(pageSize,pageNo, filters));
    }


}
