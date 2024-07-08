package avg.hijob.backend.repositories;

import avg.hijob.backend.entities.JobType;
import avg.hijob.backend.responses.ResponseJobType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobTypeRepository extends JpaRepository<JobType, Long> {

    @Query("select new avg.hijob.backend.responses.ResponseJobType(j.id,j.name) " +
            "from JobType j")
    List<ResponseJobType> findAllJobTypes();

}
