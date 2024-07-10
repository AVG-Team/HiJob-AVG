package avg.hijob.backend.repositories;

import avg.hijob.backend.entities.About;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AboutRepository extends JpaRepository<About,String> {
}
