package avg.hijob.backend.repositories;

import avg.hijob.backend.entities.JobLevelDetail;
import avg.hijob.backend.responses.ResponseJobLevelDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobLevelRepository extends JpaRepository<JobLevelDetail,Long> {

    @Query("select new avg.hijob.backend.responses.ResponseJobLevelDetail(j.id,j.level.name) " +
            " from JobLevelDetail j" +
            " where j.job.id = ?1  ")
    List<ResponseJobLevelDetail> getLevelsByJobId(String jobId);
}
