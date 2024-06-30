package avg.hijob.backend.services.impl;

import avg.hijob.backend.entities.*;
import avg.hijob.backend.exceptions.NotFoundException;
import avg.hijob.backend.repoElastic.*;
import avg.hijob.backend.repositories.JobRepository;
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

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    @Autowired
    private final JobRepository jobRepository;

    private final JobSkillDetailElasticRepository jobSkillDetailElasticRepository;

    private final JobTypeDetailElasticRepository jobTypeDetailElasticRepository;

    private final JobLevelDetailElasticRepository jobLevelDetailElasticRepository;

    private final ContractTypeDetailElasticRepository contractTypeDetailElasticRepository;

    private final JobElasticRepository jobElasticRepository;


    @Override
    public Page<ResponseJob> getAllJobs(Optional<String> companyId, Optional<Integer> pageSize, Optional<Integer> pageNo) {
        Pageable pageable = PageRequest.of(pageNo.orElse(0),pageSize.orElse(9));
        if(jobRepository.findAll().isEmpty()) {
            throw new NotFoundException("Không tìm thấy công việc nào");
        }
        return jobRepository.findAllOrCompanyId(companyId.orElse(""),pageable);

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
            throw new NotFoundException("Không tìm thấy công việc nào");
        }else{
            if(jobRepository.getJobsCreateToday(createdDate).isEmpty()) {
                throw new NotFoundException("Không có tin tuyển dụng nào hôm nay");
            }
            return jobRepository.getJobsCreateToday(createdDate);
        }

    }

    @Override
    public ResponseJob getJobById(String id) {
        if(jobRepository.findById(id).isEmpty()) {
            throw new NotFoundException("Không tìm thấy công việc nào");
        }
        return jobRepository.getJobById(id);
    }

    @Override
    public ResponseJob createJob(RequestJob requestJob) {
        return null;
    }

    @Override
    public ResponseJob updateJob(String id, RequestJob requestJob) {
        return null;
    }
}
