package avg.hijob.backend.services;

import avg.hijob.backend.entities.Level;
import avg.hijob.backend.requests.RequestJobLevelDetail;
import avg.hijob.backend.responses.ResponseJobLevelDetail;

import java.util.List;

public interface JobLevelDetailService {
    public List<ResponseJobLevelDetail> getAllJobLevelsByJobId(String jobId);
    public ResponseJobLevelDetail createJobLevelDetail(RequestJobLevelDetail request);
}
