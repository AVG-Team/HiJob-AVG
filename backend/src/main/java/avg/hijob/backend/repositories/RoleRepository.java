package avg.hijob.backend.repositories;

import avg.hijob.backend.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(String name);
    Optional<Role> findById(int id);
    Role findFirstByOrderByIdAsc();
}
