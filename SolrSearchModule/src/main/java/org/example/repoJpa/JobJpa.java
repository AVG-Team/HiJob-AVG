package org.example.repoJpa;

import org.example.entitiesJpa.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobJpa extends JpaRepository<Job, String> {

}
