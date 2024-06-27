package avg.hijob.backend.services.impl;

import avg.hijob.backend.entities.Token;
import avg.hijob.backend.entities.User;
import avg.hijob.backend.enums.TokenTypeEnum;
import avg.hijob.backend.repositories.TokenRepository;
import avg.hijob.backend.services.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService {
    private final TokenRepository tokenRepository;

    @Override
    public void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenTypeEnum.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    @Override
    public void revokedAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if(validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    @Override
    public User getUserByToken(String token) {
        System.out.println("token : 122345" + token);
        return tokenRepository.findByToken(token)
                .map(Token::getUser)
                .orElse(null);
    }
}
