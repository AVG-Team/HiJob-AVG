package avg.hijob.backend.services.impl;

import avg.hijob.backend.entities.Skill;
import avg.hijob.backend.repositories.SkillRepository;
import avg.hijob.backend.responses.SkillResponse;
import avg.hijob.backend.services.SkillService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SkillServiceImpl implements SkillService {
    private static final Logger log = LoggerFactory.getLogger(SkillServiceImpl.class);
    private final SkillRepository skillRepository;

    @Override
    public List<SkillResponse> getAllSkills() {
        return skillRepository.findAll().stream().map(SkillResponse::new).toList();
    }
}
