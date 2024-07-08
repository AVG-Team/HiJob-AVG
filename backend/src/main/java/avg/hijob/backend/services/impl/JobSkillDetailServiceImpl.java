package avg.hijob.backend.services.impl;

import avg.hijob.backend.entities.Skill;
import avg.hijob.backend.repositories.JobSkillRepository;
import avg.hijob.backend.responses.ResponseJobSkillDetail;
import avg.hijob.backend.services.JobSkillDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobSkillDetailServiceImpl implements JobSkillDetailService {

    @Autowired
    private JobSkillRepository jobSkillRepository;

    @Override
    public List<ResponseJobSkillDetail> getAllJobSkillsByJobId(String jobId) {
        if(jobSkillRepository.getSkillsByJobId(jobId).isEmpty()) {
            throw new RuntimeException("Job Skill not found");
        }
        return jobSkillRepository.getSkillsByJobId(jobId);
    }
}
