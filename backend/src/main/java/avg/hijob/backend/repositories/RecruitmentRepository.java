package avg.hijob.backend.repositories;

import avg.hijob.backend.entities.Recruitment;
import avg.hijob.backend.responses.ResponseRecruitment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecruitmentRepository extends JpaRepository<Recruitment,String> {

    @Query("select new avg.hijob.backend.responses.ResponseRecruitment(r.id, r.user.id, r.job.id, r.status, r.cv, r.coverLetter,r.appliedAt,r.deletedAt) " +
            "from Recruitment r " +
            "where r.user.id = ?1")
    public List<ResponseRecruitment> getRecruitmentByUserId(String userId);

    @Query("select new avg.hijob.backend.responses.ResponseRecruitment(r.id, r.user.id, r.job.id, r.status, r.cv, r.coverLetter,r.appliedAt,r.deletedAt) " +
            "from Recruitment r " +
            "where r.id = ?1")
    public ResponseRecruitment getRecruitmentById(String recruitmentId);

    @Query("select new avg.hijob.backend.responses.ResponseRecruitment(r.id, r.user.id, r.job.id, r.status, r.cv, r.coverLetter,r.appliedAt,r.deletedAt) " +
            "from Recruitment r " +
            "where r.job.id = ?1")
    public List<ResponseRecruitment> getRecruitmentByJobId(String jobId);

    @Query("select new avg.hijob.backend.responses.ResponseRecruitment(r.id, r.user.id, r.job.id, r.status, r.cv, r.coverLetter,r.appliedAt,r.deletedAt) " +
            "from Recruitment r " +
            "where r.job.id = ?1 and r.user.id = ?2")
    public ResponseRecruitment getRecruitmentByJobIdAndUserId(String jobId, String userId);

}
