package avg.hijob.backend.services.impl;

import avg.hijob.backend.entities.User;
import avg.hijob.backend.repositories.UserRepository;
import avg.hijob.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImp implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElse(null);
    }
}
