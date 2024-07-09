package avg.hijob.backend.repositories;

import avg.hijob.backend.entities.JobTypeDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobTypeDetailRepository extends JpaRepository<JobTypeDetail, Long> {
}
