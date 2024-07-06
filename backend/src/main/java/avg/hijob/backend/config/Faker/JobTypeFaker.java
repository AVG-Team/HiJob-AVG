package avg.hijob.backend.config.Faker;

import avg.hijob.backend.entities.JobType;
import avg.hijob.backend.enums.JobTypeEnum;
import avg.hijob.backend.repositories.JobTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JobTypeFaker implements CommandLineRunner {

    private final JobTypeRepository jobTypeRepository;

    @Override
    public void run(String... args) throws Exception {
        if(jobTypeRepository.findAll().isEmpty()){
            JobTypeEnum[] jobTypeEnums = JobTypeEnum.values();
            for(JobTypeEnum jobTypeEnum : jobTypeEnums){
                JobType jobType = new JobType();
                jobType.setName(jobTypeEnum.name());
                jobTypeRepository.save(jobType);
            }
        }

    }
}
