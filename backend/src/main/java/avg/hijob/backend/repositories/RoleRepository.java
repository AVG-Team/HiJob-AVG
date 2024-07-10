package avg.hijob.backend.repositories;

import avg.hijob.backend.entities.Role;
import avg.hijob.backend.responses.ResponseRole;
import avg.hijob.backend.responses.ResponseSkill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(String name);
    Optional<Role> findById(int id);
    Role findFirstByOrderByIdAsc();

    @Query("SELECT new avg.hijob.backend.responses.ResponseRole(r.id, r.name) " +
            "FROM Role r " +
            "WHERE (:q IS NULL OR :q = '' OR r.name LIKE %:q%)")
    Page<ResponseRole> getAllRolesQuery(
            @Param("q") String q,
            Pageable pageable
    );
}
