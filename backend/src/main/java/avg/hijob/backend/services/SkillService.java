package avg.hijob.backend.services;

import avg.hijob.backend.entities.Skill;
import avg.hijob.backend.responses.ResponseSkill;


import java.util.List;

public interface SkillService {
    public List<ResponseSkill> getAllSkills();
}
