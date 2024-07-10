package avg.hijob.backend.repositories;

import avg.hijob.backend.entities.Company;
import avg.hijob.backend.entities.User;
import avg.hijob.backend.responses.ResponseCompany;
import avg.hijob.backend.responses.dashboard.ResponseTop5Company;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanyRepository extends JpaRepository<Company,String> {

    boolean existsByUser(User user);
    @Query("SELECT new avg.hijob.backend.responses.ResponseCompany(c.id,c.name,c.taxCode,c.field,c.address,c.province,c.registration_certificate,c.about,c.linkGoogleMap,c.user.id,c.logo,c.banner,c.benefit,c.createdAt,c.updatedAt,c.deletedAt, c.user.fullName) " +
            "FROM Company c " +
            "WHERE c.deletedAt is null")
    Page<ResponseCompany> getAllCompanies(Pageable pageable);

    @Query("SELECT new avg.hijob.backend.responses.ResponseCompany(c.id,c.name,c.taxCode,c.field,c.address,c.province,c.registration_certificate,c.about,c.linkGoogleMap,c.user.id,c.logo,c.banner,c.benefit,c.createdAt,c.updatedAt,c.deletedAt, c.user.fullName) " +
            "FROM Company c " +
            "WHERE c.id = ?1 and c.deletedAt is null")
    ResponseCompany getCompanyById(String id);

    @Query("SELECT new avg.hijob.backend.responses.ResponseCompany(c.id,c.name,c.taxCode,c.field,c.address,c.province,c.registration_certificate,c.about,c.linkGoogleMap,c.user.id,c.logo,c.banner,c.benefit,c.createdAt,c.updatedAt,c.deletedAt, c.user.fullName) " +
            "FROM Company c " +
            "WHERE c.user.id = ?1 and c.deletedAt is null")
    ResponseCompany getCompanyByUserId(String id);

    @Query("SELECT new avg.hijob.backend.responses.ResponseCompany(c.id,c.name,c.taxCode,c.field,c.address,c.province,c.registration_certificate,c.about,c.linkGoogleMap,c.user.id,c.logo,c.banner,c.benefit,c.createdAt,c.updatedAt,c.deletedAt, c.user.fullName) " +
            "FROM Company c " +
            "WHERE c.deletedAt is null")
    List<ResponseCompany> getTop5Company();

//    Dũng Custom
    @Query("SELECT new avg.hijob.backend.responses.ResponseCompany(c.id, c.name, c.taxCode, c.field, c.address, c.province, c.registration_certificate, c.about, c.linkGoogleMap, c.user.id, c.logo,c.banner,c.benefit, c.createdAt, c.updatedAt, c.deletedAt, c.user.fullName) " +
            "FROM Company c " +
            "LEFT JOIN c.user e " +
            "WHERE c.deletedAt is null " +
            "AND (:q IS NULL OR :q = '' OR c.name LIKE %:q% OR str(c.taxCode) LIKE %:q% OR e.fullName LIKE %:q%) " +
            "AND (:province IS NULL OR :province = '' OR c.province = :province)")
    Page<ResponseCompany> getAllCompaniesQuery(
            @Param("q") String q,
            @Param("province") String province,
            Pageable pageable
    );

    @Query("SELECT new avg.hijob.backend.responses.dashboard.ResponseTop5Company(c.id, c.name, c.field, c.user.fullName, COUNT(cf.id)) " +
            "FROM Company c " +
            "LEFT JOIN CompanyFollow cf ON c.id = cf.company.id " +
            "WHERE c.deletedAt is null " +
            "GROUP BY c.id, c.name, c.field, c.user.fullName " +
            "ORDER BY COUNT(cf.id) DESC")
    List<ResponseTop5Company> getTop5CompanyFollow(Pageable pageable);
}
