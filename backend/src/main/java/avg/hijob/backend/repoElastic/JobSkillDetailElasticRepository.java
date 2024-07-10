package avg.hijob.backend.repoElastic;

import avg.hijob.backend.entities.JobLevelDetail;
import avg.hijob.backend.entities.JobSkillDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JobSkillDetailElasticRepository extends ElasticsearchRepository<JobSkillDetail, Long> {
    @Query("{\"bool\": {\"must\": [{\"match\": {\"skill.name\": \"?0\"}}]}}")
    List<JobSkillDetail> findJobsBySkillName(@Param("skill") String skillName);
}

