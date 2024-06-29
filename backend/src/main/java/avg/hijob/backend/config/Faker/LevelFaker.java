package avg.hijob.backend.config.Faker;

import avg.hijob.backend.entities.Level;
import avg.hijob.backend.enums.LevelJobEnum;
import avg.hijob.backend.repositories.LevelRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class LevelFaker implements CommandLineRunner {

    private final LevelRepository levelRepository;

    public LevelFaker(LevelRepository levelRepository){
        this.levelRepository = levelRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if(levelRepository.findAll().isEmpty()){
            LevelJobEnum[] levelJobEnums = LevelJobEnum.values();
            for(LevelJobEnum levelJobEnum : levelJobEnums){
                Level level = new Level();
                level.setName(levelJobEnum.name());
                levelRepository.save(level);
            }
        }

    }
}
