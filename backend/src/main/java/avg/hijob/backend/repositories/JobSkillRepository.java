package avg.hijob.backend.repositories;

import avg.hijob.backend.entities.JobSkillDetail;
import avg.hijob.backend.responses.ResponseJobSkillDetail;
import avg.hijob.backend.responses.ResponseSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobSkillRepository extends JpaRepository<JobSkillDetail,Long> {

    @Query("select new avg.hijob.backend.responses.ResponseJobSkillDetail(j.id,j.skill.name) " +
            " from JobSkillDetail j" +
            " where j.job.id = ?1  ")
    List<ResponseJobSkillDetail> getSkillsByJobId(String jobId);
}
