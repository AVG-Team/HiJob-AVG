package avg.hijob.backend.config.Faker;

import avg.hijob.backend.entities.Company;
import avg.hijob.backend.entities.User;
import avg.hijob.backend.repositories.CompanyRepository;
import avg.hijob.backend.repositories.UserRepository;
import com.github.javafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CompanyFaker implements CommandLineRunner {

    private final Faker faker;
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

    public CompanyFaker(CompanyRepository companyRepository, UserRepository userRepository) {
        this.companyRepository = companyRepository;
        this.userRepository = userRepository;
        this.faker = new Faker();
    }

    @Override
    public void run(String... args) throws Exception {
        List<Company> companies = new ArrayList<>();
        List<User> users = userRepository.findAll(); // Fetch all users

        for (int i = 0; i < Math.min(20, users.size()); i++) {
            User user = users.get(i);
            // Check if a Company already exists for this User
            if (!companyRepository.existsByUser(user)) {
                Company company = Company.builder()
                        .name(faker.company().name())
                        .address(faker.address().fullAddress())
                        .province(faker.address().country())
                        .taxCode(Integer.parseInt(faker.number().digits(5)))
                        .field(faker.job().field())
                        .registration_certificate(faker.number().digits(10))
                        .linkGoogleMap(faker.internet().url())
                        .user(user)
                        .build();
                companies.add(company);
            }
        }

        companyRepository.saveAll(companies);
    }
}
