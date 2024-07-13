package avg.hijob.backend.repositories;

import avg.hijob.backend.entities.Recruitment;
import avg.hijob.backend.responses.ResponseCompany;
import avg.hijob.backend.responses.ResponseRecruitment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecruitmentRepository extends JpaRepository<Recruitment,String> {

    @Query("select new avg.hijob.backend.responses.ResponseRecruitment(r.id, r.user.id, r.job.id, r.status, r.cv, r.coverLetter,r.appliedAt,r.deletedAt,r.user.fullName,r.job.title) " +
            "from Recruitment r " +
            "where r.user.id = ?1")
    public List<ResponseRecruitment> getRecruitmentByUserId(String userId);

    @Query("select new avg.hijob.backend.responses.ResponseRecruitment(r.id, r.user.id, r.job.id, r.status, r.cv, r.coverLetter,r.appliedAt,r.deletedAt,r.user.fullName,r.job.title) " +
            "from Recruitment r " +
            "where r.id = ?1")
    public ResponseRecruitment getRecruitmentById(String recruitmentId);

    @Query("select new avg.hijob.backend.responses.ResponseRecruitment(r.id, r.user.id, r.job.id, r.status, r.cv, r.coverLetter,r.appliedAt,r.deletedAt,r.user.fullName,r.job.title) " +
            "from Recruitment r " +
            "where r.job.id = ?1")
    public List<ResponseRecruitment> getRecruitmentByJobId(String jobId);

    @Query("select new avg.hijob.backend.responses.ResponseRecruitment(r.id, r.user.id, r.job.id, r.status, r.cv, r.coverLetter,r.appliedAt,r.deletedAt,r.user.fullName,r.job.title) " +
            "from Recruitment r " +
            "where r.job.id = ?1 and r.user.id = ?2")
    public ResponseRecruitment getRecruitmentByJobIdAndUserId(String jobId, String userId);

    @Query("SELECT new avg.hijob.backend.responses.ResponseRecruitment(r.id, r.user.id, r.job.id, r.status, r.cv, r.coverLetter,r.appliedAt,r.deletedAt,r.user.fullName,r.job.title) " +
            "FROM Recruitment r " +
            "LEFT JOIN r.user u " +
            "LEFT JOIN r.job j " +
            "WHERE r.deletedAt is null " +
            "AND (:q IS NULL OR :q = '' OR u.fullName LIKE %:q% OR j.title LIKE %:q%) ")
    Page<ResponseRecruitment> getAllRecruitmentsQuery(
            @Param("q") String q,
            Pageable pageable
    );
}
