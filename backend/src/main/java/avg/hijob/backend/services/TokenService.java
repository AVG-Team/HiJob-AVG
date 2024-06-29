package avg.hijob.backend.services;

import avg.hijob.backend.entities.User;

public interface TokenService {
    void revokedAllUserTokens(User user);
    void saveUserToken(User user, String jwtToken);
    User getUserByToken(String token);
}
