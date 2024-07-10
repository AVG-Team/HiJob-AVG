package avg.hijob.backend.config.Faker;

import avg.hijob.backend.entities.Company;
import avg.hijob.backend.entities.Job;
import avg.hijob.backend.entities.User;
import avg.hijob.backend.repositories.CompanyRepository;
import avg.hijob.backend.repositories.JobRepository;
import avg.hijob.backend.repositories.UserRepository;
import com.github.javafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class JobFaker implements CommandLineRunner {

    private final Faker faker;
    private final JobRepository jobRepository;
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;


    public JobFaker(JobRepository jobRepository, CompanyRepository companyRepository, UserRepository userRepository) {
        this.jobRepository = jobRepository;
        this.companyRepository = companyRepository;
        this.userRepository = userRepository;

        this.faker = new Faker();
    }

    @Override
    public void run(String... args) throws Exception {
        List<Job> jobs = new ArrayList<>();
        List<Company> companies = companyRepository.findAll(); // Fetch all companies
        List<User> users = userRepository.findAll(); // Fetch all users
        int index = 0;

        if (jobRepository.findAll().isEmpty()) {
            for (Company company : companies) {
                for (int i = 0; i < 5; i++) {

                    Job job = Job.builder()
                            .title(faker.job().title())
                            .responsibilities(faker.lorem().sentence())
                            .requirements(faker.lorem().sentence())
                            .requireOfYear(String.valueOf(faker.number().numberBetween(1, 10)))
                            .description(faker.lorem().paragraph())
                            .benefits(faker.lorem().sentence())
                            .salary((long) faker.number().randomDouble(2, 30000, 100000))
                            .company(company)
                            .user(users.get(index))
                            .build();
                    jobs.add(job);

                }
                index++;
                jobRepository.saveAllAndFlush(jobs);
            }
        }



    }
}
