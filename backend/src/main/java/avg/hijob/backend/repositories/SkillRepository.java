package avg.hijob.backend.repositories;

import avg.hijob.backend.entities.Skill;
import avg.hijob.backend.responses.ResponseSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkillRepository extends JpaRepository<Skill,Long> {

    @Query("Select new avg.hijob.backend.responses.ResponseSkill(s.id,s.name) " +
            "from Skill s")
    List<ResponseSkill> findAllSkills();

    @Query("SELECT s.name, COUNT(js.id) " +
            "FROM Skill s LEFT JOIN JobSkillDetail js ON s.id = js.skill.id " +
            "GROUP BY s.name")
    List<Object[]> countSkillsWithJobSkillDetail();
}
