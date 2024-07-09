package avg.hijob.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobSkillDetailRepository extends JpaRepository<avg.hijob.backend.entities.JobSkillDetail, Long> {

}
