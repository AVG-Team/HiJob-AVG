package avg.hijob.backend.services;

import avg.hijob.backend.entities.Job;
import avg.hijob.backend.requests.RequestJob;
import avg.hijob.backend.responses.ResponseJob;
import org.springframework.data.domain.Page;

import javax.annotation.Nullable;
import java.util.List;
import java.util.Optional;

public interface JobService {

    public Page<ResponseJob> getAllJobs(Optional<String> id, Optional<Integer> pageSize, Optional<Integer> pageNo);

    public Page<Job> mappingJobs(Optional<String> jobType, Optional<String> jobSkill, Optional<String> jobLevel
            , Optional<String> contractType, Optional<Integer> pageNo, Optional<Integer> pageSize);
}
