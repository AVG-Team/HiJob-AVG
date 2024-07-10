package avg.hijob.backend.services.impl;

import avg.hijob.backend.entities.JobFollow;
import avg.hijob.backend.exceptions.NotFoundException;
import avg.hijob.backend.repositories.JobFollowRepository;
import avg.hijob.backend.repositories.JobRepository;
import avg.hijob.backend.repositories.UserRepository;
import avg.hijob.backend.responses.MessageResponse;
import avg.hijob.backend.responses.ResponseJobFollow;
import avg.hijob.backend.services.JobFollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobFollowServiceImpl implements JobFollowService {

    @Autowired
    public JobFollowRepository jobFollowRepository;

    @Autowired
    public UserRepository userRepository;

    @Autowired
    public JobRepository jobRepository;

    @Override
    public List<ResponseJobFollow> findAllJobFollows() {
        if(jobFollowRepository.findAll().isEmpty()){
            throw new NotFoundException("No job follows found", HttpStatus.NOT_FOUND);
        }
        return jobFollowRepository.findAllJobFollows();
    }

    @Override
    public List<ResponseJobFollow> findAllJobFollowsByUserId(String userId) {
        if(jobFollowRepository.findAllJobFollowsByUserId(userId).isEmpty()){
            throw new NotFoundException("No job follows found", HttpStatus.NOT_FOUND);
        }
        return jobFollowRepository.findAllJobFollowsByUserId(userId);
    }

    @Override
    public List<ResponseJobFollow> findAllJobFollowsByJobId(String jobId) {
        if(jobFollowRepository.findAllJobFollowsByJobId(jobId).isEmpty()){
            throw new NotFoundException("No job follows found", HttpStatus.NOT_FOUND);
        }
        return jobFollowRepository.findAllJobFollowsByJobId(jobId);
    }

    @Override
    public ResponseJobFollow findJobFollowByUserIdAndJobId(String userId, String jobId) {
        if(jobFollowRepository.findJobFollowByUserIdAndJobId(userId, jobId) == null){
            throw new NotFoundException("No job follow found", HttpStatus.NOT_FOUND);
        }
        return jobFollowRepository.findJobFollowByUserIdAndJobId(userId, jobId);
    }

    @Override
    public ResponseJobFollow createJobFollow(String userId, String jobId) {
         try {
             if(userRepository.findById(userId).isEmpty()){
                 throw new NotFoundException("User not found", HttpStatus.NOT_FOUND);
             }
                if(jobRepository.findById(jobId).isEmpty()){
                    throw new NotFoundException("Job not found", HttpStatus.NOT_FOUND);
                }
             JobFollow jobFollow = JobFollow.builder()
                     .user(userRepository.findById(userId).get())
                     .job(jobRepository.findById(jobId).get())
                     .build();

                jobFollowRepository.save(jobFollow);

                return new ResponseJobFollow(jobFollow.getId(), jobFollow.getUser().getId(), jobFollow.getJob().getId());
         }catch (Exception e){
                throw new NotFoundException("Error creating job follow", HttpStatus.INTERNAL_SERVER_ERROR);
         }
    }

    @Override
    public ResponseJobFollow findJobFollowById(Long id) {
        if(jobFollowRepository.findJobFollowById(id) == null){
            throw new NotFoundException("No job follow found", HttpStatus.NOT_FOUND);
        }
        return jobFollowRepository.findJobFollowById(id);
    }

    @Override
    public MessageResponse deleteJobFollowById(String userId, String jobId) {
        if(jobFollowRepository.findJobFollowByUserIdAndJobId(userId,jobId) == null){
            return new  MessageResponse(HttpStatus.NOT_FOUND,"No job follow found");
        }
        ResponseJobFollow jobFollow = jobFollowRepository.findJobFollowByUserIdAndJobId(userId,jobId);
        jobFollowRepository.deleteById(jobFollow.getId());
        return new MessageResponse(HttpStatus.OK,"Job follow deleted successfully");
    }
}
