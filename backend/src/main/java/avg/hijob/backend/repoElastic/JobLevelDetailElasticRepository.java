package avg.hijob.backend.repoElastic;

import avg.hijob.backend.entities.Job;
import avg.hijob.backend.entities.JobLevelDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface JobLevelDetailElasticRepository extends ElasticsearchRepository<JobLevelDetail,Long> {
    @Query("{\"bool\": {\"must\": [{\"match\": {\"levelName.name\": \"?0\"}}]}}")
    List<JobLevelDetail> findJobsByLevelName(@Param("level") String levelName);

}
