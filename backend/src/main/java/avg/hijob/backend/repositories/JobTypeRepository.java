package avg.hijob.backend.repositories;

import avg.hijob.backend.entities.JobTypeDetail;
import avg.hijob.backend.responses.ResponseJobType;
import avg.hijob.backend.responses.ResponseJobTypeDetail;
import avg.hijob.backend.responses.ResponseSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobTypeRepository extends JpaRepository<JobTypeDetail,Long> {

    @Query("select new avg.hijob.backend.responses.ResponseJobTypeDetail(j.id,j.jobType.name) " +
            " from JobTypeDetail j" +
            " where j.job.id = ?1  ")
    List<ResponseJobTypeDetail> getAllTypesByJobId(String jobId);
}
