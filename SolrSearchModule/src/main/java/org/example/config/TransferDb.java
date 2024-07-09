package org.example.config;

import org.example.entitiesJpa.Job;
import org.example.repoJpa.JobJpa;
import org.example.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class TransferDb implements CommandLineRunner {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private JobJpa jobJpa;
    @Override
    public void run(String... args) throws Exception {
//        jobRepository.deleteAll();
        List<Job> jobJpaList = jobJpa.findAll();



        List<Job> jobList = new ArrayList<>();
            for (Job i: jobJpaList){
                Job job = Job.builder()
                        .title(i.getTitle())
                        .responsibilities(i.getResponsibilities())
                        .requirements(i.getRequirements())
                        .requireOfYear(i.getRequireOfYear())
                        .description(i.getDescription())
                        .benefits(i.getBenefits())
                        .salary(i.getSalary())
                        .build();
                jobList.add(job);

        }
        jobRepository.saveAll(jobList);
    }
}
