package avg.hijob.backend.services.impl;

import avg.hijob.backend.repositories.JobTypeDetailRepository;
import avg.hijob.backend.responses.ResponseJobTypeDetail;
import avg.hijob.backend.services.JobTypeDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobTypeDetailServiceImpl implements JobTypeDetailService {

    @Autowired
    private final JobTypeDetailRepository jobTypeRepository;

    @Override
    public List<ResponseJobTypeDetail> getAllJobTypesByJobId(String jobId) {
        if(jobTypeRepository.getAllTypesByJobId(jobId).isEmpty()) {
            throw new RuntimeException("Job Type not found");
        }else{
            return jobTypeRepository.getAllTypesByJobId(jobId);
        }
    }
}
