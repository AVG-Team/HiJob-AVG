package avg.hijob.backend.services;

import avg.hijob.backend.entities.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService {
    User findByEmail(String email);
}
