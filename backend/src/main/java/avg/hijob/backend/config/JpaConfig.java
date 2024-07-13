package avg.hijob.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages = "avg.hijob.backend.repositories")
public class JpaConfig {
}
