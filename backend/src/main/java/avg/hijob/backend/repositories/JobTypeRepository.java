package avg.hijob.backend.repositories;

import avg.hijob.backend.entities.JobType;
import avg.hijob.backend.responses.ResponseJobType;
import avg.hijob.backend.responses.ResponseSkill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobTypeRepository extends JpaRepository<JobType, Long> {

    @Query("select new avg.hijob.backend.responses.ResponseJobType(j.id,j.name) " +
            "from JobType j")
    List<ResponseJobType> findAllJobTypes();

    @Query("SELECT new avg.hijob.backend.responses.ResponseJobType(j.id, j.name) " +
            "FROM JobType j " +
            "WHERE (:q IS NULL OR :q = '' OR j.name LIKE %:q%)")
    Page<ResponseJobType> getAllJobTypesQuery(
            @Param("q") String q,
            Pageable pageable
    );

    @Query("SELECT new avg.hijob.backend.responses.ResponseJobType(j.id, j.name) " +
            "FROM JobType j " +
            "WHERE j.id = ?1")
    ResponseJobType findByIds(Integer id);

    @Query("SELECT new avg.hijob.backend.responses.ResponseJobType(j.id, j.name) " +
            "FROM JobType j WHERE j.name = :name")
    ResponseJobType findByName(@Param("name") String name);
}
