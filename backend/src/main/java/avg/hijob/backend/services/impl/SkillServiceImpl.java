package avg.hijob.backend.services.impl;

import avg.hijob.backend.exceptions.NotFoundException;
import avg.hijob.backend.repositories.SkillRepository;
import avg.hijob.backend.responses.ResponseSkill;
import avg.hijob.backend.services.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SkillServiceImpl implements SkillService {

    private final SkillRepository skillRepository;

    @Override
    public List<ResponseSkill> getAllSkills() {
        if(skillRepository.findAll().isEmpty()){
            throw new NotFoundException("Skills not found", HttpStatus.NOT_FOUND);
        }
        return skillRepository.findAllSkills();
    }
}
