package avg.hijob.backend.repositories;

import avg.hijob.backend.entities.Company;
import avg.hijob.backend.entities.User;
import avg.hijob.backend.responses.ResponseCompany;
import avg.hijob.backend.responses.ResponseJob;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends JpaRepository<Company,Long> {

    boolean existsByUser(User user);
    @Query("SELECT new avg.hijob.backend.responses.ResponseCompany(j.id,j.name,j.taxCode,j.field,j.address,j.province,j.registration_certificate,j.about,j.linkGoogleMap,j.user.id,j.createdAt,j.updatedAt,j.deletedAt) " +
            "FROM Company j ")
    Page<ResponseCompany> findAllCus( Pageable pageable);

    @Query("SELECT new avg.hijob.backend.responses.ResponseCompany(c.id, c.name, c.taxCode, c.field, c.address, c.province, c.registration_certificate, c.about, c.linkGoogleMap, c.user.id, c.createdAt, c.updatedAt, c.deletedAt) " +
            "FROM Company c WHERE c.address LIKE %:address%")
    Page<ResponseCompany> findAllByAddress(String address, Pageable pageable);

    @Query("SELECT new avg.hijob.backend.responses.ResponseCompany(c.id, c.name, c.taxCode, c.field, c.address, c.province, c.registration_certificate, c.about, c.linkGoogleMap, c.user.id, c.createdAt, c.updatedAt, c.deletedAt) " +
            "FROM Company c WHERE c.name LIKE %:name%")
    Page<ResponseCompany> findAllByName(String name, Pageable pageable);

    @Query("SELECT new avg.hijob.backend.responses.ResponseCompany(c.id, c.name, c.taxCode, c.field, c.address, c.province, c.registration_certificate, c.about, c.linkGoogleMap, c.user.id, c.createdAt, c.updatedAt, c.deletedAt) " +
            "FROM Company c WHERE c.province LIKE %:province%")
    Page<ResponseCompany> findAllByProvince(String province, Pageable pageable);


}
