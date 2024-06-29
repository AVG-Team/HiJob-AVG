package avg.hijob.backend.repositories;

import avg.hijob.backend.entities.Company;
import avg.hijob.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends JpaRepository<Company,Long> {

    boolean existsByUser(User user);
}
