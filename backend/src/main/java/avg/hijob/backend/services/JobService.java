package avg.hijob.backend.services;

import avg.hijob.backend.responses.ResponseJob;
import org.springframework.data.domain.Page;

import java.util.Optional;

public interface JobService {

    public Page<ResponseJob> getAllJobs(Optional<String> id, Optional<Integer> pageSize, Optional<Integer> pageNo);
}
