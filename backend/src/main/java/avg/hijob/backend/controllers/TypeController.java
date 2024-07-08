package avg.hijob.backend.controllers;

import avg.hijob.backend.responses.ResponseHandler;
import avg.hijob.backend.services.JobTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/type")
@RequiredArgsConstructor
public class TypeController {

    @Autowired
    private final JobTypeService jobTypeService;

    @GetMapping("")
    public ResponseEntity<Object> findAllJobTypes() {
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK,jobTypeService.findAllJobTypes());
    }

}
