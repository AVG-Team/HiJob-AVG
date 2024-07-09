package avg.hijob.backend.repoElastic;


import avg.hijob.backend.entities.Company;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface CompanyElasticRepository extends ElasticsearchRepository<Company, String> {
    @Query("{\"match\": {\"name\": \"?0\"}}")
    Page<Company> findByName(String name, Pageable pageable);


    @Query("{\"match\": {\"field\": \"?0\"}}")
    Page<Company> findByField(String field, Pageable pageable);

    @Query("{\"match\": {\"province\": \"?0\"}}")
    Page<Company> findByProvince(String province, Pageable pageable);


}
