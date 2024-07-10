package avg.hijob.backend.repositories;

import avg.hijob.backend.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);
    Optional<User> findByPhone(String phone);
    Optional<User> findById(String id);

    @Query("SELECT u FROM User u WHERE " +
            "(:q IS NULL OR :q = '' OR u.fullName LIKE %:q% OR u.email LIKE %:q%) AND " +
            "(:company IS NULL OR :company = '' OR u.company.name = :company) AND " +
            "(:jobPosition IS NULL OR :jobPosition = '' OR u.jobPosition = :jobPosition) AND " +
            "(:province IS NULL OR :province = '' OR u.province = :province) AND " +
            "(:active IS NULL OR u.isActive = :active) AND " +
            "(:role IS NULL OR u.role.id = :role) AND " +
            "(:age IS NULL OR YEAR(u.birthday) = :age)")
    Page<User> searchUsers(@Param("q") String q,
                           @Param("company") String company,
                           @Param("jobPosition") String jobPosition,
                           @Param("province") String province,
                           @Param("active") Boolean active,
                           @Param("role") Integer role,
                           @Param("age") Integer year,
                           Pageable pageable);

    @Query("SELECT u.role.id, u.createdAt, COUNT(u) " +
            "FROM User u " +
            "WHERE u.role.id IN (1, 2) AND u.createdAt >= :startDate AND u.createdAt < :endDate " +
            "GROUP BY u.role.id, u.createdAt")
    List<Object[]> countUsersByRoleAndDateRange(@Param("startDate") Timestamp startDate, @Param("endDate") Timestamp endDate);
}
