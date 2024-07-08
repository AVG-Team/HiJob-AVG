package avg.hijob.backend.repositories;

import avg.hijob.backend.entities.Level;
import avg.hijob.backend.responses.ResponseLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LevelRepository extends JpaRepository<Level,Long> {

    @Query("Select new avg.hijob.backend.responses.ResponseLevel(l.id,l.name) " +
            "from Level l")
    List<ResponseLevel> findAllLevels();
}
