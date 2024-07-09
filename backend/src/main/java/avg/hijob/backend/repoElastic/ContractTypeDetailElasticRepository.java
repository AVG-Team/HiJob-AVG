package avg.hijob.backend.repoElastic;

import avg.hijob.backend.entities.ContractTypeDetail;
import avg.hijob.backend.entities.JobLevelDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ContractTypeDetailElasticRepository extends ElasticsearchRepository<ContractTypeDetail,Long> {
    @Query("{\"bool\": {\"must\": [{\"match\": {\"contractType.name\": \"?0\"}}]}}")
    List<ContractTypeDetail> findJobsByContractName(@Param("contracttype") String contractType);
}
