package avg.hijob.backend.services.impl;

import avg.hijob.backend.entities.JobTypeDetail;
import avg.hijob.backend.repositories.JobRepository;
import avg.hijob.backend.repositories.JobTypeDetailRepository;
import avg.hijob.backend.repositories.JobTypeRepository;
import avg.hijob.backend.requests.RequestJobTypeDetail;
import avg.hijob.backend.responses.ResponseJobTypeDetail;
import avg.hijob.backend.services.JobTypeDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobTypeDetailServiceImpl implements JobTypeDetailService {

    @Autowired
    private JobTypeDetailRepository jobTypeDetailRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private JobTypeRepository jobTypeRepository;

    @Override
    public List<ResponseJobTypeDetail> getAllJobTypesByJobId(String jobId) {
        if(jobTypeDetailRepository.getAllTypesByJobId(jobId).isEmpty()) {
            throw new RuntimeException("Job Type not found");
        }else{
            return jobTypeDetailRepository.getAllTypesByJobId(jobId);
        }
    }

    @Override
    public ResponseJobTypeDetail createJobTypeDetail(RequestJobTypeDetail request) {
        if(jobRepository.findById(request.getJobId()).isEmpty()){
            throw new RuntimeException("Job not found");
        }
        if(jobTypeRepository.findById(request.getJobTypeId()).isEmpty()){
            throw new RuntimeException("Type not found");
        }

        JobTypeDetail jobTypeDetail = JobTypeDetail.builder()
                .job(jobRepository.findById(request.getJobId()).get())
                .jobType(jobTypeRepository.findById(request.getJobTypeId()).get())
                .build();
        jobTypeDetailRepository.save(jobTypeDetail);

        return new ResponseJobTypeDetail((long) jobTypeDetail.getJobType().getId(), jobTypeDetail.getJobType().getName());
    }
}
