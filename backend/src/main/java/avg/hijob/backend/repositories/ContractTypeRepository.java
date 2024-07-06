package avg.hijob.backend.repositories;

import avg.hijob.backend.entities.ContractType;
import avg.hijob.backend.responses.ResponseContractType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContractTypeRepository extends JpaRepository<ContractType, Integer> {

    @Query(" SELECT new avg.hijob.backend.responses.ResponseContractType(c.id, c.name) " +
            " FROM ContractType c")
    List<ResponseContractType> findAllContractTypes();
}
