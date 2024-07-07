package avg.hijob.backend.services.impl;

import avg.hijob.backend.entities.Level;
import avg.hijob.backend.repositories.JobLevelRepository;
import avg.hijob.backend.responses.ResponseJobLevelDetail;
import avg.hijob.backend.services.JobLevelDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobLevelDetailServiceImpl implements JobLevelDetailService {

    @Autowired
    private JobLevelRepository jobLevelRepository;

    @Override
    public List<ResponseJobLevelDetail> getAllJobLevelsByJobId(String jobId) {
        if(jobLevelRepository.getLevelsByJobId(jobId).isEmpty()) {
            throw new RuntimeException("Job Level not found");
        }
        return jobLevelRepository.getLevelsByJobId(jobId);
    }
}
