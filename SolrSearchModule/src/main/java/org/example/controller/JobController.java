package org.example.controller;

import lombok.RequiredArgsConstructor;

import org.example.repoJpa.JobJpa;
import org.example.repository.JobRepository;
import org.example.response.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/jobs")
@RequiredArgsConstructor
public class JobController {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private JobJpa jobJpa;

    @GetMapping("/db")
    public ResponseEntity<Object> dbJob(){

        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, jobJpa.findAll() );
    }
    @GetMapping("/alljob")
    public ResponseEntity<Object> getJob(){

        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, jobRepository.findAll() );
    }
    @GetMapping("/all")
    public ResponseEntity<Object> getAllJobs(
            @RequestParam(name = "pageNo", value="pageNo") Optional<Integer> pageNo,
            @RequestParam(name = "pageSize", value="pageSize") Optional<Integer> pageSize
    ){
        Pageable pageable = PageRequest.of(pageNo.orElse(0),pageSize.orElse(9));
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK,  jobRepository.findAll(pageable));
    }


}
