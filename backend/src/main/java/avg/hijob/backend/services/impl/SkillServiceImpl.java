package avg.hijob.backend.services.impl;

import avg.hijob.backend.entities.Company;
import avg.hijob.backend.entities.Skill;
import avg.hijob.backend.exceptions.NotFoundException;
import avg.hijob.backend.repositories.SkillRepository;
import avg.hijob.backend.requests.RequestCompany;
import avg.hijob.backend.requests.RequestSkill;
import avg.hijob.backend.responses.ResponseCompany;
import avg.hijob.backend.responses.ResponseSkill;
import avg.hijob.backend.services.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service

public class SkillServiceImpl implements SkillService {

    @Autowired
    private SkillRepository skillRepository;

    @Override
    public List<ResponseSkill> getAllSkills() {
        if(skillRepository.findAll().isEmpty()){
            throw new NotFoundException("Skills not found", HttpStatus.NOT_FOUND);
        }
        return skillRepository.findAllSkills();
    }

    @Override
    public ResponseSkill getSkillById(Integer id) {
        /*if(skillRepository.findById(id).isEmpty()){
            throw new NotFoundException("Skill not found", HttpStatus.NOT_FOUND);
        }*/
        return skillRepository.findByIds(id);
    }

    @Override
    public Page<ResponseSkill> getAllSkill(Optional<Integer> pageSize, Optional<Integer> pageNo, Optional<String> q) {
        Pageable pageable = PageRequest.of(pageNo.orElse(0), pageSize.orElse(12));
        if(skillRepository.getAllSkillsQuery(q.orElse(null), pageable).isEmpty()){
            throw new NotFoundException("Skills not found", HttpStatus.NOT_FOUND);
        }
        return skillRepository.getAllSkillsQuery(q.orElse(null), pageable);
    }

    @Transactional
    @Override
    public ResponseSkill createSkill(RequestSkill requestSkill) {
        try{
                Skill skill = Skill.builder()
                        .name(requestSkill.getSkillName())
                        .build();
                skillRepository.save(skill);
                return skillRepository.findByIds(skill.getId());
        }catch (Exception e){
            System.out.println(e.getMessage());
            throw new NotFoundException("Error creating skill", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseSkill updateSkill(Long id, RequestSkill requestSkill) {
        try{
                Skill skill = skillRepository.findById(id).get();
                skill.setName(requestSkill.getSkillName());
                skillRepository.save(skill);
                return skillRepository.findByIds(skill.getId());
        }catch (Exception e){
            throw new NotFoundException("Error updating skill", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseSkill deleteSkill(Long id) {
        try{
            if(skillRepository.findById(id).isEmpty()){
                throw new NotFoundException("Company not found", HttpStatus.NOT_FOUND);
            }else{
                Skill skill = skillRepository.findById(id).get();
                skillRepository.deleteById(id);
                return skillRepository.findByIds(skill.getId());
            }

        }catch (Exception e){
            throw new NotFoundException("Error deleting company", HttpStatus.BAD_REQUEST);
        }
    }
}
