package avg.hijob.backend.repositories;

import avg.hijob.backend.entities.Level;
import avg.hijob.backend.responses.ResponseLevel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LevelRepository extends JpaRepository<Level,Long> {

    @Query("Select new avg.hijob.backend.responses.ResponseLevel(l.id,l.name) " +
            "from Level l")
    List<ResponseLevel> findAllLevels();

    @Query("SELECT l.name, COUNT(jl.id) " +
            "FROM Level l LEFT JOIN JobLevelDetail jl ON l.id = jl.level.id " +
            "GROUP BY l.name")
    List<Object[]> countLevelsWithJobLevelDetail();

    @Query("SELECT new avg.hijob.backend.responses.ResponseLevel(l.id, l.name) " +
            "FROM Level l " +
            "WHERE (:q IS NULL OR :q = '' OR l.name LIKE %:q%)")
    Page<ResponseLevel> getAllLevelQuery(
            @Param("q") String q,
            Pageable pageable
    );

    @Query("SELECT new avg.hijob.backend.responses.ResponseLevel(l.id, l.name) " +
            "FROM Level l " +
            "WHERE l.id = ?1")
    ResponseLevel findByIds(Integer id);

    @Query("SELECT new avg.hijob.backend.responses.ResponseLevel(l.id, l.name) " +
            "FROM Level l WHERE l.name = :name")
    ResponseLevel findByName(@Param("name") String name);
}
