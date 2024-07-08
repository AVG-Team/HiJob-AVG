package avg.hijob.backend.services;

import avg.hijob.backend.entities.JobType;
import avg.hijob.backend.responses.ResponseJobTypeDetail;

import java.util.List;

public interface JobTypeDetailService {
    public List<ResponseJobTypeDetail> getAllJobTypesByJobId(String jobId);
}
