package avg.hijob.backend.services.impl;

import avg.hijob.backend.entities.JobSkillDetail;
import avg.hijob.backend.entities.Skill;
import avg.hijob.backend.repositories.JobRepository;
import avg.hijob.backend.repositories.JobSkillRepository;
import avg.hijob.backend.repositories.SkillRepository;
import avg.hijob.backend.requests.RequestJobSkillDetail;
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

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Override
    public List<ResponseJobSkillDetail> getAllJobSkillsByJobId(String jobId) {
        if(jobSkillRepository.getSkillsByJobId(jobId).isEmpty()) {
            throw new RuntimeException("Job Skill not found");
        }
        return jobSkillRepository.getSkillsByJobId(jobId);
    }

    @Override
    public ResponseJobSkillDetail createJobSkillDetail(RequestJobSkillDetail request) {
        if(jobRepository.findById(request.getJobId()).isEmpty()){
            throw new RuntimeException("Job not found");
        }
        if(skillRepository.findById(request.getSkillId()).isEmpty()){
            throw new RuntimeException("Skill not found");
        }

        JobSkillDetail jobSkillDetail = JobSkillDetail.builder()
                .job(jobRepository.findById(request.getJobId()).get())
                .skill(skillRepository.findById(request.getSkillId()).get()).build();
        jobSkillRepository.save(jobSkillDetail);

        return new ResponseJobSkillDetail((long) jobSkillDetail.getSkill().getId(), jobSkillDetail.getSkill().getName());
    }
}
