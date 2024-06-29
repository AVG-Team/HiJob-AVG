package avg.hijob.backend.repositories;

import avg.hijob.backend.entities.Level;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LevelRepository extends JpaRepository<Level,Long> {
}
