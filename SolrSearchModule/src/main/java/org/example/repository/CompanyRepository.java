package org.example.repository;

import org.example.entitiesJpa.Company;
import org.example.response.ResponseCompany;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

public interface CompanyRepository extends ElasticsearchRepository<Company, String> {
//    @Query("*:*")
//    Page<ResponseCompany> findAll(Pageable pageable);
//
//    @Query("address:*?0*")
//    Page<ResponseCompany> findAllByAddress(String address, Pageable pageable);
//
//    @Query("name:*?0*")
//    Page<ResponseCompany> findAllByName(String name, Pageable pageable);
//
//    @Query("province:*?0*")
//    Page<ResponseCompany> findAllByProvince(String province, Pageable pageable);
}
