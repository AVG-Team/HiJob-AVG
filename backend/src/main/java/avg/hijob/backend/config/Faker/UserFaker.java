package avg.hijob.backend.config.Faker;

import avg.hijob.backend.entities.User;
import avg.hijob.backend.enums.SkillEnum;
import avg.hijob.backend.repositories.UserRepository;
import com.github.javafaker.Faker;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Component
public class UserFaker implements CommandLineRunner {

    private final Faker faker;
    private final UserRepository userRepository;

    public UserFaker(UserRepository userRepository){
        this.userRepository = userRepository;
        this.faker = new Faker();
    }

    @Override
    public void run(String... args) throws Exception {
        if(userRepository.findAll().isEmpty()){
            SkillEnum[] skills = SkillEnum.values();
            List<User> users = new ArrayList<>();
            for (int i = 0; i < 10; i++) {
                User user = User.builder()
                        .email(faker.internet().emailAddress())
                        .password(faker.internet().password())
                        .phone(faker.number().digits(10))
                        .address(faker.address().fullAddress())
                        .province(faker.address().state())
                        .avatar(faker.internet().avatar())
                        .fullName(faker.name().fullName())
                        .jobPosition(faker.job().position())
                        .yearExperience(faker.number().numberBetween(1, 10))
                        .skills(IntStream.range(0, new Random().nextInt(5))
                                .mapToObj(j -> skills[new Random().nextInt(skills.length)].name())
                                .collect(Collectors.joining(",")))
                        .build();
                users.add(user);
            }
            userRepository.saveAll(users);
        }

    }
}
