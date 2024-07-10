package avg.hijob.backend.services;

import avg.hijob.backend.requests.RequestJob;
import avg.hijob.backend.responses.ResponseJob;
import org.springframework.data.domain.Page;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

public interface JobService {

    Page<ResponseJob> getAllJobs(Optional<Integer> pageSize, Optional<Integer> pageNo, Optional<String> q);
    Page<ResponseJob> getAllJobsByCompany(Optional<String> id, Optional<Integer> pageSize, Optional<Integer> pageNo);
    List<ResponseJob> getJobsCreateToday(Timestamp createdDate);
    ResponseJob getJobById(String id);
    ResponseJob createJob(RequestJob requestJob);
    ResponseJob updateJob(String id, RequestJob requestJob);
    ResponseJob deleteJob(String id);
}
