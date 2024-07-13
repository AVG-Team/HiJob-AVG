package avg.hijob.backend.services.impl;

import avg.hijob.backend.entities.JobLevelDetail;
import avg.hijob.backend.entities.Level;
import avg.hijob.backend.repositories.JobLevelRepository;
import avg.hijob.backend.repositories.JobRepository;
import avg.hijob.backend.repositories.LevelRepository;
import avg.hijob.backend.requests.RequestJobLevelDetail;
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

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private LevelRepository levelRepository;

    @Override
    public List<ResponseJobLevelDetail> getAllJobLevelsByJobId(String jobId) {
        if(jobLevelRepository.getLevelsByJobId(jobId).isEmpty()) {
            throw new RuntimeException("Job Level not found");
        }
        return jobLevelRepository.getLevelsByJobId(jobId);
    }

    @Override
    public ResponseJobLevelDetail createJobLevelDetail(RequestJobLevelDetail request) {

        if(jobRepository.findById(request.getJobId()).isEmpty()){
            throw new RuntimeException("Job not found");
        }

        if(levelRepository.findById(request.getLevelId()).isEmpty()){
            throw new RuntimeException("Level not found");
        }

        JobLevelDetail jobLevelDetail = JobLevelDetail.builder()
                .job(jobRepository.findById(request.getJobId()).get())
                .level(levelRepository.findById(request.getLevelId()).get())
                .build();

        jobLevelRepository.save(jobLevelDetail);

        return new ResponseJobLevelDetail((long) jobLevelDetail.getLevel().getId(), jobLevelDetail.getLevel().getName());
    }
}
