package avg.hijob.backend.services;

import avg.hijob.backend.entities.Skill;
import avg.hijob.backend.requests.RequestJobSkillDetail;
import avg.hijob.backend.responses.ResponseJobSkillDetail;

import java.util.List;

public interface JobSkillDetailService {
    public List<ResponseJobSkillDetail> getAllJobSkillsByJobId(String jobId);
    public ResponseJobSkillDetail createJobSkillDetail(RequestJobSkillDetail request);
}
