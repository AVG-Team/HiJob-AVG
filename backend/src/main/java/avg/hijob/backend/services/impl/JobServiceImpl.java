package avg.hijob.backend.services.impl;

import avg.hijob.backend.entities.*;
import avg.hijob.backend.exceptions.NotFoundException;
import avg.hijob.backend.repositories.CompanyRepository;
import avg.hijob.backend.repoElastic.*;
import avg.hijob.backend.repositories.JobRepository;
import avg.hijob.backend.repositories.UserRepository;
import avg.hijob.backend.requests.RequestJob;
import avg.hijob.backend.responses.ResponseHandler;
import avg.hijob.backend.responses.ResponseJob;
import avg.hijob.backend.services.JobService;
import com.nimbusds.jose.util.Pair;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private UserRepository userRepository;

    private final JobSkillDetailElasticRepository jobSkillDetailElasticRepository;

    private final JobTypeDetailElasticRepository jobTypeDetailElasticRepository;

    private final JobLevelDetailElasticRepository jobLevelDetailElasticRepository;

    private final ContractTypeDetailElasticRepository contractTypeDetailElasticRepository;

    private final JobElasticRepository jobElasticRepository;

    @Override
    public Page<ResponseJob> getAllJobs(Optional<Integer> pageSize, Optional<Integer> pageNo) {
    Pageable pageable = PageRequest.of(pageNo.orElse(0),pageSize.orElse(9));
        if(jobRepository.findAll().isEmpty()) {
            throw new NotFoundException("No jobs found", HttpStatus.NOT_FOUND);
        }
        return jobRepository.findAllJobs(pageable);
    }




    @Override
    public Page<ResponseJob> getAllJobsByCompany(Optional<String> companyId, Optional<Integer> pageSize, Optional<Integer> pageNo) {
        Pageable pageable = PageRequest.of(pageNo.orElse(0),pageSize.orElse(9));
        if(jobRepository.findAll().isEmpty()) {
            throw new NotFoundException("No jobs found", HttpStatus.NOT_FOUND);
        }
        return jobRepository.findAllByCompanyId(companyId.orElse(""),pageable);

    }

    @Override
    public Page<ResponseJob> getAllJobs(Optional<String> id, Optional<Integer> pageSize, Optional<Integer> pageNo) {
        return null;
    }

    @Override
    public Page<Job> mappingJobs(Optional<String> jobType, Optional<String> jobSkill, Optional<String> jobLevel,
                                 Optional<String> contractType, Optional<Integer> pageNo, Optional<Integer> pageSize) {

        // Map to store job IDs and their match count based on search criteria
        Map<String, Integer> mapJob = new HashMap<>();

        // Number of provided criteria
        AtomicInteger criteriaCount = new AtomicInteger(0);

        // Check if jobSkill parameter is present
        if (jobSkill.isPresent()) {
            criteriaCount.incrementAndGet();
            List<JobSkillDetail> jobSkillDetails = jobSkillDetailElasticRepository.findJobsBySkillName(jobSkill.get());
            jobSkillDetails.forEach(item -> {
                String jobId = item.getJob().getId();
                mapJob.put(jobId, mapJob.getOrDefault(jobId, 0) + 1);
            });
        }

        // Check if jobType parameter is present
        if (jobType.isPresent()) {
            criteriaCount.incrementAndGet();
            List<JobTypeDetail> jobTypeDetails = jobTypeDetailElasticRepository.findJobsByTypeName(jobType.get());
            jobTypeDetails.forEach(item -> {
                String jobId = item.getJob().getId();
                mapJob.put(jobId, mapJob.getOrDefault(jobId, 0) + 1);
            });
        }

        // Check if jobLevel parameter is present
        if (jobLevel.isPresent()) {
            criteriaCount.incrementAndGet();
            List<JobLevelDetail> jobLevelDetails = jobLevelDetailElasticRepository.findJobsByLevelName(jobLevel.get());
            jobLevelDetails.forEach(item -> {
                String jobId = item.getJob().getId();
                mapJob.put(jobId, mapJob.getOrDefault(jobId, 0) + 1);
            });
        }

        // Check if contractType parameter is present
        if (contractType.isPresent()) {
            criteriaCount.incrementAndGet();
            List<ContractTypeDetail> contractTypeDetails = contractTypeDetailElasticRepository.findJobsByContractName(contractType.get());
            contractTypeDetails.forEach(item -> {
                String jobId = item.getJob().getId();
                mapJob.put(jobId, mapJob.getOrDefault(jobId, 0) + 1);
            });
        }

        // Filter job IDs that match all provided search criteria
        List<String> filteredJobIds = mapJob.entrySet()
                .stream()
                .filter(entry -> entry.getValue() >= criteriaCount.get()) // Check if the job matches all the provided criteria
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());

        // Retrieve jobs based on filtered job IDs
        Iterable<Job> jobIterable = jobElasticRepository.findAllById(filteredJobIds);
        List<Job> jobList = new ArrayList<>();
        jobIterable.forEach(jobList::add);

        // Create and return a Page object with the retrieved jobs
        return new PageImpl<>(jobList, PageRequest.of(pageNo.orElse(0), pageSize.orElse(10)), jobList.size());
    }




    @Override
    public List<ResponseJob> getJobsCreateToday(Timestamp createdDate) {
        if(jobRepository.findAll().isEmpty()) {
            throw new NotFoundException("No jobs found", HttpStatus.NOT_FOUND);
        }else{
            if(jobRepository.getJobsCreateToday(createdDate).isEmpty()) {
                throw new NotFoundException("No jobs found", HttpStatus.NOT_FOUND);
            }
            return jobRepository.getJobsCreateToday(createdDate);
        }

    }

    @Override
    public ResponseJob getJobById(String id) {
        if(jobRepository.findById(id).isEmpty()) {
            throw new NotFoundException("No job found", HttpStatus.NOT_FOUND);
        }
        return jobRepository.getJobById(id);
    }

    @Override
    public ResponseJob createJob(RequestJob requestJob) {
        try{
            Job job = Job.builder()
                    .title(requestJob.getTitle())
                    .description(requestJob.getDescription())
                    .responsibilities(requestJob.getResponsibilities())
                    .requirements(requestJob.getRequirements())
                    .benefits(requestJob.getBenefits())
                    .requireOfYear(requestJob.getRequireOfYear())
                    .salary(requestJob.getSalary())
                    .company(companyRepository.getReferenceById(requestJob.getCompanyId()))
                    .user(userRepository.getReferenceById(requestJob.getUserId()))
                    .build();
            jobRepository.save(job);

            return new ResponseJob(job.getId(),job.getTitle(),job.getDescription(),job.getResponsibilities(),
                    job.getRequirements(),job.getBenefits(),job.getRequireOfYear(),job.getSalary(),
                    job.getCompany().getId(),job.getUser().getId(),job.getCreatedAt(),job.getUpdatedAt(),job.getDeletedAt());

        }catch (Exception ex) {
            throw new NotFoundException("Error creating job", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseJob updateJob(String id, RequestJob requestJob) {
        try{
            if(jobRepository.findById(id).isEmpty()) {
                throw new NotFoundException("No job found", HttpStatus.NOT_FOUND);
            }
            Job job = jobRepository.findById(id).get();
            job.setTitle(requestJob.getTitle());
            job.setDescription(requestJob.getDescription());
            job.setResponsibilities(requestJob.getResponsibilities());
            job.setRequirements(requestJob.getRequirements());
            job.setBenefits(requestJob.getBenefits());
            job.setRequireOfYear(requestJob.getRequireOfYear());
            job.setSalary(requestJob.getSalary());
            jobRepository.save(job);

            return new ResponseJob(job.getId(),job.getTitle(),job.getDescription(),job.getResponsibilities(),
                    job.getRequirements(),job.getBenefits(),job.getRequireOfYear(),job.getSalary(),
                    job.getCompany().getId(),job.getUser().getId(),job.getCreatedAt(),job.getUpdatedAt(),job.getDeletedAt());

        }catch (Exception ex) {
            throw new NotFoundException("Error updating job", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseJob deleteJob(String id) {
        try{
            if(jobRepository.findById(id).isEmpty()) {
                throw new NotFoundException("No job found", HttpStatus.NOT_FOUND);
            }
            Timestamp dateNow = Timestamp.from(Instant.now());
            Job job = jobRepository.findById(id).get();
            job.setDeletedAt(dateNow);

            jobRepository.save(job);

            return new ResponseJob(job.getId(),job.getTitle(),job.getDescription(),job.getResponsibilities(),
                    job.getRequirements(),job.getBenefits(),job.getRequireOfYear(),job.getSalary(),
                    job.getCompany().getId(),job.getUser().getId(),job.getCreatedAt(),job.getUpdatedAt(),job.getDeletedAt());

        }catch (Exception ex){
            throw new NotFoundException("Error deleting job", HttpStatus.BAD_REQUEST);
        }
    }
}
