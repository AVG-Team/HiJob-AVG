package avg.hijob.backend.controllers;

import avg.hijob.backend.requests.RequestCompany;
import avg.hijob.backend.responses.ResponseHandler;
import avg.hijob.backend.services.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/companies")
@RequiredArgsConstructor
public class CompanyController {

    @Autowired
    private final CompanyService companyService;

    @GetMapping("")
    public ResponseEntity<Object> getAllCompanies(Optional<Integer> pageNo, Optional<Integer> pageSize){
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, companyService.getAllCompanies(pageSize, pageNo));
    }

    @GetMapping("/getCompanyById/{id}")
    public ResponseEntity<Object> getCompanyById(@PathVariable  String id){
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, companyService.getCompanyById(id));
    }

    @GetMapping("/getCompanyByUser/{userId}")
    public ResponseEntity<Object> getCompanyByUser(@PathVariable  String userId){
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, companyService.getCompanyByUser(userId));
    }

    @GetMapping("/getTop5Companies")
    public ResponseEntity<Object> getTop5Companies(){
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, companyService.getTop5Companies());
    }
    @PostMapping("/createCompany")
    public ResponseEntity<Object> create(@ModelAttribute RequestCompany requestCompany){
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, companyService.createCompany(requestCompany));
    }

    @PutMapping("/updateCompany/{id}")
    public ResponseEntity<Object> update(@PathVariable String id, @RequestBody RequestCompany requestCompany){
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, companyService.updateCompany(id, requestCompany));
    }

    @PutMapping("/deleteCompany/{id}")
    public ResponseEntity<Object> delete(@PathVariable String id){
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, companyService.deleteCompany(id));
    }

}
