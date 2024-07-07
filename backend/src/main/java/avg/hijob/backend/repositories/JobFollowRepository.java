package avg.hijob.backend.repositories;

import avg.hijob.backend.entities.JobFollow;
import avg.hijob.backend.responses.ResponseJobFollow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobFollowRepository extends JpaRepository<JobFollow, Long> {

    @Query("Select new avg.hijob.backend.responses.ResponseJobFollow (j.id, j.user.id, j.job.id)" +
            " from JobFollow j")
    List<ResponseJobFollow> findAllJobFollows();

    @Query("Select new avg.hijob.backend.responses.ResponseJobFollow (j.id, j.user.id, j.job.id)" +
            " from JobFollow j where j.user.id = ?1")
    List<ResponseJobFollow> findAllJobFollowsByUserId(String userId);

    @Query("Select new avg.hijob.backend.responses.ResponseJobFollow (j.id, j.user.id, j.job.id)" +
            " from JobFollow j where j.job.id = ?1")
    List<ResponseJobFollow> findAllJobFollowsByJobId(String jobId);

    @Query("Select new avg.hijob.backend.responses.ResponseJobFollow (j.id, j.user.id, j.job.id)" +
            " from JobFollow j where j.user.id = ?1 and j.job.id = ?2")
    ResponseJobFollow findJobFollowByUserIdAndJobId(String userId, String jobId);

    @Query("Select new avg.hijob.backend.responses.ResponseJobFollow (j.id, j.user.id, j.job.id)" +
            " from JobFollow j where j.id = ?1")
    ResponseJobFollow findJobFollowById(Long id);

}
