package avg.hijob.backend.repositories;

import avg.hijob.backend.entities.Job;
import avg.hijob.backend.responses.ResponseJob;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface JobRepository extends JpaRepository<Job, String> {

    @Query("SELECT new avg.hijob.backend.responses.ResponseJob(j.id,j.title,j.description,j.responsibilities,j.requirements,j.benefits,j.requireOfYear,j.salary,j.company.id,j.user.id,j.createdAt,j.updatedAt,j.deletedAt) " +
           "FROM Job j " +
            " WHERE ?1 = '' or j.company.id like %?1%")
    Page<ResponseJob> findAllOrCompanyId(String idCompany, Pageable pageable);

}
