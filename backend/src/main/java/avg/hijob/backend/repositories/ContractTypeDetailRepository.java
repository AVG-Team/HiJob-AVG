package avg.hijob.backend.repositories;

import avg.hijob.backend.entities.ContractTypeDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContractTypeDetailRepository extends JpaRepository<ContractTypeDetail, Long> {
}
