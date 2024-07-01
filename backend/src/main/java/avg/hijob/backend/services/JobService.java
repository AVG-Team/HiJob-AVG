package avg.hijob.backend.services;

import avg.hijob.backend.requests.RequestJob;
import avg.hijob.backend.responses.ResponseJob;
import org.springframework.data.domain.Page;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

public interface JobService {

    public Page<ResponseJob> getAllJobs(Optional<Integer> pageSize, Optional<Integer> pageNo);
    public Page<ResponseJob> getAllJobsByCompany(Optional<String> id, Optional<Integer> pageSize, Optional<Integer> pageNo);
    public List<ResponseJob> getJobsCreateToday(Timestamp createdDate);
    public ResponseJob getJobById(String id);
    public ResponseJob createJob(RequestJob requestJob);
    public ResponseJob updateJob(String id, RequestJob requestJob);
    public ResponseJob deleteJob(String id);

}
