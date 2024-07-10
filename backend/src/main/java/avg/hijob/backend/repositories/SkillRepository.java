package avg.hijob.backend.repositories;

import avg.hijob.backend.entities.Skill;
import avg.hijob.backend.responses.ResponseCompany;
import avg.hijob.backend.responses.ResponseSkill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkillRepository extends JpaRepository<Skill,Long> {

    @Query("Select new avg.hijob.backend.responses.ResponseSkill(s.id,s.name) " +
            "from Skill s")
    List<ResponseSkill> findAllSkills();

    @Query("SELECT new avg.hijob.backend.responses.ResponseSkill(s.id, s.name) " +
            "FROM Skill s " +
            "WHERE (:q IS NULL OR :q = '' OR s.name LIKE %:q%)")
    Page<ResponseSkill> getAllSkillsQuery(
            @Param("q") String q,
            Pageable pageable
    );

    @Query("SELECT new avg.hijob.backend.responses.ResponseSkill(s.id, s.name) " +
            "FROM Skill s " +
            "WHERE s.id = ?1")
    ResponseSkill findByIds(Integer id);
}
