package avg.hijob.backend.services.impl;

import avg.hijob.backend.entities.Job;
import avg.hijob.backend.exceptions.NotFoundException;
import avg.hijob.backend.repositories.CompanyRepository;
import avg.hijob.backend.repositories.JobRepository;
import avg.hijob.backend.repositories.UserRepository;
import avg.hijob.backend.requests.RequestJob;
import avg.hijob.backend.responses.ResponseJob;
import avg.hijob.backend.services.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class JobServiceImpl implements JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private UserRepository userRepository;

//    @Override
//    public Page<ResponseJob> getAllJobs(Optional<Integer> pageSize, Optional<Integer> pageNo, Optional<String> q) {
//        Pageable pageable = PageRequest.of(pageNo.orElse(0), pageSize.orElse(9));
//        if (jobRepository.findAll().isEmpty()) {
//            throw new NotFoundException("No jobs found", HttpStatus.NOT_FOUND);
//        }
//        return jobRepository.getAllJobsQuery(q.orElse(null), pageable);
//    }

    @Override
    public Page<ResponseJob> getAllJobsWithQuery(Optional<Integer> pageSize, Optional<Integer> pageNo, Optional<String> q, Optional<Integer> salary, Optional<Integer> yearExp) {
        int pageNumber = pageNo.orElse(0);
        int size = pageSize.orElse(9);
        Pageable pageable = PageRequest.of(pageNumber, size);

        if (jobRepository.findAll().isEmpty()) {
            throw new NotFoundException("No jobs found", HttpStatus.NOT_FOUND);
        }

        Long salaryMain = salary.isPresent() && salary.get() != -1 ? (long) salary.get() * 1000000 : -1L;
        Integer yearExpMain = yearExp.orElse(-1);
        String qMain = q.orElse("");

        return jobRepository.getAllJobsQuery(qMain, yearExpMain, salaryMain, pageable);
    }

    @Override
    public Page<ResponseJob> getAllJobsByCompany(Optional<String> companyId, Optional<Integer> pageSize, Optional<Integer> pageNo) {
        Pageable pageable = PageRequest.of(pageNo.orElse(0), pageSize.orElse(9));
        if (jobRepository.findAll().isEmpty()) {
            throw new NotFoundException("No jobs found", HttpStatus.NOT_FOUND);
        }
        return jobRepository.findAllByCompanyId(companyId.orElse(""), pageable);
    }

    @Override
    public List<ResponseJob> getJobsCreateToday(Timestamp createdDate) {
        if (jobRepository.findAll().isEmpty()) {
            throw new NotFoundException("No jobs found", HttpStatus.NOT_FOUND);
        } else {
            if (jobRepository.getJobsCreateToday(createdDate).isEmpty()) {
                throw new NotFoundException("No jobs found", HttpStatus.NOT_FOUND);
            }
            return jobRepository.getJobsCreateToday(createdDate);
        }
    }

    @Override
    public ResponseJob getJobById(String id) {
        if (jobRepository.findById(id).isEmpty()) {
            throw new NotFoundException("No job found", HttpStatus.NOT_FOUND);
        }
        return jobRepository.getJobById(id);
    }

    @Override
    public ResponseJob createJob(RequestJob requestJob) {
        try {
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

            return new ResponseJob(job.getId(), job.getTitle(), job.getDescription(), job.getResponsibilities(),
                    job.getRequirements(), job.getBenefits(), job.getRequireOfYear(), job.getSalary(),
                    job.getCompany().getId(),job.getCompany().getName(), job.getUser().getId(), job.getUser().getFullName() , job.getCreatedAt(), job.getUpdatedAt(), job.getDeletedAt());

        } catch (Exception ex) {
            throw new NotFoundException("Error creating job", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseJob updateJob(String id, RequestJob requestJob) {
        try {
            if (jobRepository.findById(id).isEmpty()) {
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

            return new ResponseJob(job.getId(), job.getTitle(), job.getDescription(), job.getResponsibilities(),
                    job.getRequirements(), job.getBenefits(), job.getRequireOfYear(), job.getSalary(),
                    job.getCompany().getId(), job.getCompany().getName() ,job.getUser().getId(), job.getUser().getFullName(), job.getCreatedAt(), job.getUpdatedAt(), job.getDeletedAt());

        } catch (Exception ex) {
            throw new NotFoundException("Error updating job", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseJob deleteJob(String id) {
        try {
            if (jobRepository.findById(id).isEmpty()) {
                throw new NotFoundException("No job found", HttpStatus.NOT_FOUND);
            }
            Timestamp dateNow = Timestamp.from(Instant.now());
            Job job = jobRepository.findById(id).get();
            job.setDeletedAt(dateNow);

            jobRepository.save(job);

            return new ResponseJob(job.getId(), job.getTitle(), job.getDescription(), job.getResponsibilities(),
                    job.getRequirements(), job.getBenefits(), job.getRequireOfYear(), job.getSalary(),
                    job.getCompany().getId(), job.getCompany().getName(),job.getUser().getId(), job.getUser().getFullName(), job.getCreatedAt(), job.getUpdatedAt(), job.getDeletedAt());

        } catch (Exception ex) {
            throw new NotFoundException("Error deleting job", HttpStatus.BAD_REQUEST);
        }
    }
}
