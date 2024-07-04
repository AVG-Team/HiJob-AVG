package avg.hijob.backend.repositories;

import avg.hijob.backend.entities.ContractTypeDetail;
import avg.hijob.backend.responses.ResponseContractTypeDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobContractTypeRepository extends JpaRepository<ContractTypeDetail,Long>{

    @Query("select new avg.hijob.backend.responses.ResponseContractTypeDetail(j.id,j.contractType.name) " +
            " from ContractTypeDetail j" +
            " where j.job.id = ?1  ")
    List<ResponseContractTypeDetail> getAllContractTypesByJobId(String jobId);
}


