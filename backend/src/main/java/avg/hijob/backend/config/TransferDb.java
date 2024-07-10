package avg.hijob.backend.config;

import avg.hijob.backend.entities.*;
import avg.hijob.backend.repoElastic.*;
import avg.hijob.backend.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class TransferDb implements CommandLineRunner {

    private final JobElasticRepository jobElasticRepository;
    @Autowired
    private JobRepository jobRepository;


    private final JobLevelDetailElasticRepository jobLevelDetailElasticRepository;

    private final JobSkillDetailElasticRepository jobSkillDetailElasticRepository;

    private final JobTypeDetailElasticRepository JobTypeDetailElasticRepository;

    private final ContractTypeDetailElasticRepository contractTypeDetailElasticRepository;



    @Autowired
    private JobLevelDetailRepository jobLevelDetailRepository;

    private final JobSkillDetailRepository jobSkillDetailRepository;

     private final JobTypeDetailRepository jobTypeDetailRepository;

    private final ContractTypeDetailRepository contractTypeDetailRepository;
    @Override
    public void run(String... args) throws Exception {
        jobElasticRepository.deleteAll();
        List<Job> jobJpaList = jobRepository.findAll();
        List<Job> jobList = new ArrayList<>();
        for (Job i : jobJpaList) {
            Job job = Job.builder()
                    .id(i.getId())
                    .title(i.getTitle())
                    .responsibilities(i.getResponsibilities())
                    .requirements(i.getRequirements())
                    .requireOfYear(i.getRequireOfYear())
                    .description(i.getDescription())
                    .benefits(i.getBenefits())
                    .salary(i.getSalary())
                    .build();
            jobList.add(job);

        }
        jobElasticRepository.saveAll(jobList);

        jobLevelDetailElasticRepository.deleteAll();
         List<JobLevelDetail> jobJpaLevelDetails = jobLevelDetailRepository.findAll();
         List<JobLevelDetail> jobLevelDetails = new ArrayList<>();

        if(!jobJpaLevelDetails.isEmpty()){
            for (JobLevelDetail i: jobJpaLevelDetails){
                Job job = Job.builder()
                        .id(i.getJob().getId())
                        .title(i.getJob().getTitle())
                        .responsibilities(i.getJob().getResponsibilities())
                        .requirements(i.getJob().getRequirements())
                        .requireOfYear(i.getJob().getRequireOfYear())
                        .description(i.getJob().getDescription())
                        .benefits(i.getJob().getBenefits())
                        .salary(i.getJob().getSalary())
                        .build();

                Level level = Level.builder().id(i.getLevel().getId()).name(i.getLevel().getName()).build();

               JobLevelDetail jobLevelDetail = JobLevelDetail.builder()
                       .id(i.getId())
                       .level(level)
                       .job(job)
                      .build();
               jobLevelDetails.add(jobLevelDetail);

               }
            }
            jobLevelDetailElasticRepository.saveAll(jobLevelDetails);

            jobSkillDetailElasticRepository.deleteAll();
            List<JobSkillDetail> jobSkillDetailList = jobSkillDetailRepository.findAll();
            List<JobSkillDetail> jobSkillDetailsElastic = new ArrayList<>();
            if(!jobSkillDetailList.isEmpty()){
                for (JobSkillDetail i: jobSkillDetailList){
                    Job job = Job.builder()
                            .id(i.getJob().getId())
                            .title(i.getJob().getTitle())
                            .responsibilities(i.getJob().getResponsibilities())
                            .requirements(i.getJob().getRequirements())
                            .requireOfYear(i.getJob().getRequireOfYear())
                            .description(i.getJob().getDescription())
                            .benefits(i.getJob().getBenefits())
                            .salary(i.getJob().getSalary())
                            .build();

                    Skill skill = Skill.builder().id(i.getSkill().getId()).name(i.getSkill().getName()).build();

                    JobSkillDetail jobLevelDetail = JobSkillDetail.builder()
                            .id(i.getId())
                            .skill(skill)
                            .job(job)
                            .build();
                    jobSkillDetailsElastic.add(jobLevelDetail);
                }
            }
            jobSkillDetailElasticRepository.saveAll(jobSkillDetailsElastic);

            jobTypeDetailRepository.findAll();
            List<JobTypeDetail> jobTypeDetailList = jobTypeDetailRepository.findAll();
            List<JobTypeDetail> jobTypeDetailsElastic = new ArrayList<>();
            if (!jobTypeDetailList.isEmpty()){
                for (JobTypeDetail i: jobTypeDetailList){
                    Job job = Job.builder()
                            .id(i.getJob().getId())
                            .title(i.getJob().getTitle())
                            .responsibilities(i.getJob().getResponsibilities())
                            .requirements(i.getJob().getRequirements())
                            .requireOfYear(i.getJob().getRequireOfYear())
                            .description(i.getJob().getDescription())
                            .benefits(i.getJob().getBenefits())
                            .salary(i.getJob().getSalary())
                            .build();

                    JobType jobType = JobType.builder().id(i.getJobType().getId()).name(i.getJobType().getName()).build();

                    JobTypeDetail jobLevelDetail = JobTypeDetail.builder()
                            .id(i.getId())
                            .jobType(jobType)
                            .job(job)
                            .build();
                    jobTypeDetailsElastic.add(jobLevelDetail);
                }
            }
            JobTypeDetailElasticRepository.saveAll(jobTypeDetailsElastic);

            contractTypeDetailElasticRepository.deleteAll();
            List<ContractTypeDetail> contractTypeDetailList = contractTypeDetailRepository.findAll();
            List<ContractTypeDetail> contractTypeDetailsElastic = new ArrayList<>();
            if(!contractTypeDetailList.isEmpty()){
                for (ContractTypeDetail i: contractTypeDetailList){
                    Job job = Job.builder()
                            .id(i.getJob().getId())
                            .title(i.getJob().getTitle())
                            .responsibilities(i.getJob().getResponsibilities())
                            .requirements(i.getJob().getRequirements())
                            .requireOfYear(i.getJob().getRequireOfYear())
                            .description(i.getJob().getDescription())
                            .benefits(i.getJob().getBenefits())
                            .salary(i.getJob().getSalary())
                            .build();

                    ContractType contractType = ContractType.builder().id(i.getContractType().getId()).name(i.getContractType().getName()).build();

                    ContractTypeDetail contractTypeDetail = ContractTypeDetail.builder().id(i.getId()).contractType(contractType).job(job).build();
                    contractTypeDetailsElastic.add(contractTypeDetail);
                }
            }
            contractTypeDetailElasticRepository.saveAll(contractTypeDetailsElastic);
    }
}
