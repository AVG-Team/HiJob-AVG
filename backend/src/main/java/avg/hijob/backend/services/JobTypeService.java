package avg.hijob.backend.services;

import avg.hijob.backend.requests.RequestJobType;
import avg.hijob.backend.requests.RequestSkill;
import avg.hijob.backend.responses.ResponseJobType;
import avg.hijob.backend.responses.ResponseSkill;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface JobTypeService {
    public List<ResponseJobType> findAllJobTypes();
    public ResponseJobType getJobTypeById(Integer id);
    Page<ResponseJobType> getAllJobType(Optional<Integer> pageSize, Optional<Integer> pageNo, Optional<String> q);
    public ResponseJobType createJobType(RequestJobType requestJobType);
    public ResponseJobType updateJobType(Long id, RequestJobType requestJobType);
    public ResponseJobType deleteJobType(Long id);
}
