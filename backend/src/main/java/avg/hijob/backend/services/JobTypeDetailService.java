package avg.hijob.backend.services;

import avg.hijob.backend.entities.JobType;
import avg.hijob.backend.requests.RequestJobTypeDetail;
import avg.hijob.backend.responses.ResponseJobTypeDetail;

import java.util.List;

public interface JobTypeDetailService {
    public List<ResponseJobTypeDetail> getAllJobTypesByJobId(String jobId);
    public ResponseJobTypeDetail createJobTypeDetail(RequestJobTypeDetail request);
}
