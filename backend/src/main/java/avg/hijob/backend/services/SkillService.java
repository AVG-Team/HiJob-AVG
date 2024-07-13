package avg.hijob.backend.services;

import avg.hijob.backend.requests.RequestCompany;
import avg.hijob.backend.requests.RequestSkill;
import avg.hijob.backend.responses.ResponseCompany;
import avg.hijob.backend.entities.Skill;
import avg.hijob.backend.responses.ResponseSkill;
import org.springframework.data.domain.Page;


import java.util.List;
import java.util.Optional;

public interface SkillService {
    public List<ResponseSkill> getAllSkills();
    public ResponseSkill getSkillById(Integer id);
    Page<ResponseSkill> getAllSkill(Optional<Integer> pageSize, Optional<Integer> pageNo, Optional<String> q);
    public ResponseSkill createSkill(RequestSkill requestSkill);
    public ResponseSkill updateSkill(Long id, RequestSkill requestSkill);
    public ResponseSkill deleteSkill(Long id);
}
