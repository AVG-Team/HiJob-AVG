package avg.hijob.backend.repositories;

import avg.hijob.backend.entities.Job;
import avg.hijob.backend.responses.ResponseCompany;
import avg.hijob.backend.responses.ResponseJob;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;


@Repository
public interface JobRepository extends JpaRepository<Job, String> {


    @Query(" SELECT new avg.hijob.backend.responses.ResponseJob(j.id,j.title,j.description,j.responsibilities,j.requirements,j.benefits,j.requireOfYear,j.salary,j.company.id,j.company.name,j.user.id, j.user.fullName,j.createdAt,j.updatedAt,j.deletedAt) " +
            " FROM Job j " +
            "where j.deletedAt is null")
    Page<ResponseJob> findAllJobs(Pageable pageable);


    @Query("SELECT new avg.hijob.backend.responses.ResponseJob(j.id,j.title,j.description,j.responsibilities,j.requirements,j.benefits,j.requireOfYear,j.salary,j.company.id,j.company.name,j.user.id, j.user.fullName,j.createdAt,j.updatedAt,j.deletedAt) " +
           "FROM Job j " +
            " WHERE ?1 = '' or j.company.id like %?1% and j.deletedAt is null")
    Page<ResponseJob> findAllByCompanyId(String idCompany, Pageable pageable);


    @Query("SELECT new avg.hijob.backend.responses.ResponseJob(j.id, j.title, j.description, j.responsibilities, j.requirements, j.benefits, j.requireOfYear, j.salary, j.company.id,j.company.name, j.user.id, j.user.fullName, j.createdAt, j.updatedAt, j.deletedAt) " +
            "FROM Job j " +
            "WHERE FUNCTION('YEAR', j.createdAt) = FUNCTION('YEAR', ?1) " +
            "AND FUNCTION('MONTH', j.createdAt) = FUNCTION('MONTH', ?1)" +
            "and j.deletedAt is null")
    List<ResponseJob> getJobsCreateToday(Timestamp createdDate);

    @Query("SELECT new avg.hijob.backend.responses.ResponseJob(j.id,j.title,j.description,j.responsibilities,j.requirements,j.benefits,j.requireOfYear,j.salary,j.company.id,j.company.name,j.user.id, j.user.fullName,j.createdAt,j.updatedAt,j.deletedAt) " +
            "FROM Job j " +
            " WHERE j.id = ?1 and j.deletedAt is null")
    ResponseJob getJobById(String id);

    @Query("SELECT new avg.hijob.backend.responses.ResponseJob(j.id, j.title, j.description, j.responsibilities, j.requirements, j.benefits, j.requireOfYear, j.salary, j.company.id, j.company.name, j.user.id, j.user.fullName, j.createdAt, j.updatedAt, j.deletedAt) " +
            "FROM Job j " +
            "LEFT JOIN j.company c " +
            "LEFT JOIN j.user u " +
            "WHERE j.deletedAt IS NULL " +
            "AND (:q IS NULL OR :q = '' OR j.title LIKE %:q% OR c.name LIKE %:q% OR u.fullName LIKE %:q%) " +
            "AND (:yearExp IS NULL OR :yearExp = -1 OR CAST(j.requireOfYear AS integer) <= :yearExp) " +
            "AND (:salary IS NULL OR :salary = -1L OR j.salary <= :salary)")
    Page<ResponseJob> getAllJobsQuery(
            @Param("q") String q,
            @Param("yearExp") Integer yearExp,
            @Param("salary") Long salary,
            Pageable pageable
    );
}
