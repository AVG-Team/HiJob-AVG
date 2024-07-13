package avg.hijob.backend.repoElastic;


import avg.hijob.backend.entities.Job;
import avg.hijob.backend.responses.ResponseJob;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface JobElasticRepository extends ElasticsearchRepository<Job, String> {
    // Find jobs by title containing the keyword
    @Query("{\"bool\": {\"must\": [{\"wildcard\": {\"title\": \"*?0*\"}}]}}")
    Page<ResponseJob> findByTitleContaining(String title, Pageable pageable);

//    // Find jobs by description containing the keyword
//    @Query("{\"match\": {\"description\": {\"query\": \"?0\", \"operator\": \"and\"}}}")
//    Page<Job> findByDescriptionContaining(String keyword, Pageable pageable);
//
//    // Find jobs by responsibilities containing the keyword
//    @Query("{\"match\": {\"responsibilities\": {\"query\": \"?0\", \"operator\": \"and\"}}}")
//    Page<Job> findByResponsibilitiesContaining(String keyword, Pageable pageable);
//
//    // Find jobs by requirements containing the keyword
//    @Query("{\"match\": {\"requirements\": {\"query\": \"?0\", \"operator\": \"and\"}}}")
//    Page<Job> findByRequirementsContaining(String keyword, Pageable pageable);
//
//    // Find jobs by benefits containing the keyword
//    @Query("{\"bool\": {\"must\": [{\"wildcard\": {\"benefits\": \"*?0*\"}}]}}")
//    Page<Job> findByBenefitsContaining(String benefits, Pageable pageable);
//
//    // Find jobs by required years of experience containing the keyword
//    @Query("{\"match\": {\"requireOfYear\": {\"query\": \"?0\", \"operator\": \"and\"}}}")
//    Page<Job> findByRequireOfYearContaining(String keyword, Pageable pageable);



}
