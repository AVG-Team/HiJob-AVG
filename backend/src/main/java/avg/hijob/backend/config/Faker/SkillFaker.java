package avg.hijob.backend.config.Faker;

import avg.hijob.backend.entities.Skill;
import avg.hijob.backend.enums.SkillEnum;
import avg.hijob.backend.repositories.SkillRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class SkillFaker implements CommandLineRunner {

    private final SkillRepository skillRepository;

    public SkillFaker(SkillRepository skillRepository){
        this.skillRepository = skillRepository;
    }


    @Override
    public void run(String... args) throws Exception {
        if(skillRepository.findAll().isEmpty()){
            SkillEnum[] skillEnums = SkillEnum.values();
            for (SkillEnum skillEnum : skillEnums) {
                Skill skill = new Skill();
                skill.setName(skillEnum.name());
                skillRepository.save(skill);
            }
        }

    }
}
