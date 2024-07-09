package avg.hijob.backend.repoElastic;

import avg.hijob.backend.entities.JobLevelDetail;
import avg.hijob.backend.entities.JobType;
import avg.hijob.backend.entities.JobTypeDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JobTypeDetailElasticRepository extends ElasticsearchRepository<JobTypeDetail, Long> {
    @Query("{\"bool\": {\"should\": [{\"match\": {\"jobType.name\": \"?0\"}}]}}")
    List<JobTypeDetail> findJobsByTypeName(@Param("jobType") String typename);
}
