package avg.hijob.backend.services;

import avg.hijob.backend.responses.MessageResponse;
import avg.hijob.backend.responses.ResponseJobFollow;

import java.util.List;

public interface JobFollowService {
    List<ResponseJobFollow> findAllJobFollows();
    List<ResponseJobFollow> findAllJobFollowsByUserId(String  userId);
    List<ResponseJobFollow> findAllJobFollowsByJobId(String jobId);
    ResponseJobFollow findJobFollowByUserIdAndJobId(String userId, String jobId);
    ResponseJobFollow createJobFollow(String userId, String jobId);
    ResponseJobFollow findJobFollowById(Long id);
    MessageResponse deleteJobFollowById(String userId, String jobId);
}
