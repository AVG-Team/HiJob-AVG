package avg.hijob.backend.repositories;

import avg.hijob.backend.entities.JobLevelDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobLevelDetailRepository extends JpaRepository<JobLevelDetail, Long> {
}
