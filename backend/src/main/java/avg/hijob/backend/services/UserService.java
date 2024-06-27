package avg.hijob.backend.services;

import avg.hijob.backend.entities.User;
import avg.hijob.backend.responses.ProfileResponse;

public interface UserService {
    User findByEmail(String email);
    ProfileResponse getUserCurrent();
}
