package avg.hijob.backend.services;

import avg.hijob.backend.entities.Skill;
import avg.hijob.backend.responses.SkillResponse;

import java.util.List;

public interface SkillService {
    public List<SkillResponse> getAllSkills();
}
