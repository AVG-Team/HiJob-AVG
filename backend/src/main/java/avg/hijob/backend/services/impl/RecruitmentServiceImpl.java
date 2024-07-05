package avg.hijob.backend.services.impl;

import avg.hijob.backend.entities.Recruitment;
import avg.hijob.backend.exceptions.NotFoundException;
import avg.hijob.backend.repositories.JobRepository;
import avg.hijob.backend.repositories.RecruitmentRepository;
import avg.hijob.backend.repositories.UserRepository;
import avg.hijob.backend.requests.RequestRecruitment;
import avg.hijob.backend.responses.ResponseRecruitment;
import avg.hijob.backend.services.RecruitmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecruitmentServiceImpl implements RecruitmentService {

    @Autowired
    private final RecruitmentRepository recruitmentRepository;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final JobRepository jobRepository;

    @Override
    public List<ResponseRecruitment> getRecruitmentByUserId(String userId) {
        if(userRepository.findById(userId).isEmpty()) {
            throw new NotFoundException("User not found", HttpStatus.NOT_FOUND);
        }
        return recruitmentRepository.getRecruitmentByUserId(userId);
    }

    @Override
    public ResponseRecruitment getRecruitmentById(String recruitmentId) {
        if(recruitmentRepository.findById(recruitmentId).isEmpty())
            throw new NotFoundException("Recruitment not found", HttpStatus.NOT_FOUND);
        return recruitmentRepository.getRecruitmentById(recruitmentId);
    }

    @Override
    public List<ResponseRecruitment> getRecruitmentByJobId(String jobId) {
        if(jobRepository.findById(jobId).isEmpty())
            throw new NotFoundException("Job not found", HttpStatus.NOT_FOUND);
        return recruitmentRepository.getRecruitmentByJobId(jobId);
    }

    @Override
    public ResponseRecruitment getRecruitmentByJobIdAndUserId(String jobId, String userId) {
        if(jobRepository.findById(jobId).isEmpty())
            throw new NotFoundException("Job not found", HttpStatus.NOT_FOUND);
        if(userRepository.findById(userId).isEmpty())
            throw new NotFoundException("User not found", HttpStatus.NOT_FOUND);
        return recruitmentRepository.getRecruitmentByJobIdAndUserId(jobId, userId);
    }

    @Override
    public ResponseRecruitment createRecruitment(RequestRecruitment requestRecruitment) {
      try{
          Recruitment recruitment = Recruitment.builder()
                  .user(userRepository.findById(requestRecruitment.getUserId()).get())
                  .job(jobRepository.findById(requestRecruitment.getJobId()).get())
                  .cv(requestRecruitment.getCv())
                  .coverLetter(requestRecruitment.getCoverLetter())
                  .status(requestRecruitment.getStatus())
                  .build();
          recruitmentRepository.save(recruitment);

          return new ResponseRecruitment(recruitment.getId(), recruitment.getUser().getId(),
                  recruitment.getJob().getId(),recruitment.getStatus(), recruitment.getCv(),
                  recruitment.getCoverLetter(),  recruitment.getAppliedAt(), recruitment.getDeletedAt());

      }catch (Exception e) {
          throw new NotFoundException("Error", HttpStatus.NOT_FOUND);
      }
    }

    @Override
    public ResponseRecruitment deleteRecruitment(String recruitmentId) {
        return null;
    }
}
