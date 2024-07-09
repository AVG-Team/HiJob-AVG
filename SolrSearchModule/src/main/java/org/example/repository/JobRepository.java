package org.example.repository;


import org.example.entitiesJpa.Job;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

public interface JobRepository extends ElasticsearchRepository<Job, String> {

}
