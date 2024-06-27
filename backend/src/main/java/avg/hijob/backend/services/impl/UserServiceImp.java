package avg.hijob.backend.services.impl;

import avg.hijob.backend.entities.CustomUserDetail;
import avg.hijob.backend.entities.User;
import avg.hijob.backend.repositories.UserRepository;
import avg.hijob.backend.responses.ProfileResponse;
import avg.hijob.backend.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImp implements UserService {
    private static final Logger log = LoggerFactory.getLogger(UserServiceImp.class);
    @Autowired
    private UserRepository userRepository;

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElse(null);
    }

    @Override
    public ProfileResponse getUserCurrent() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            System.out.println(authentication.getPrincipal());
            CustomUserDetail customUserDetail = (CustomUserDetail) authentication.getPrincipal();

            User user = customUserDetail.getUser();
            return ProfileResponse.builder()
                    .fullName(user.getFullName())
                    .email(user.getEmail())
                    .phone(user.getPhone())
                    .address(user.getAddress())
                    .province(user.getProvince())
                    .avatar(user.getAvatar())
                    .jobPosition(user.getJobPosition())
                    .yearExperience(user.getYearExperience())
                    .skills(user.getSkills())
                    .socialNetwork1(user.getSocialNetwork1())
                    .socialNetwork2(user.getSocialNetwork2())
                    .coverLetter(null)
                    .build();
        }

        return null;
    }
}
