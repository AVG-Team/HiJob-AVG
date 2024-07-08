package avg.hijob.backend.services.impl;

import avg.hijob.backend.entities.CustomUserDetail;
import avg.hijob.backend.entities.User;
import avg.hijob.backend.repositories.UserRepository;
import avg.hijob.backend.requests.user.UpdateProfileRequest;
import avg.hijob.backend.responses.FileUploadResponse;
import avg.hijob.backend.responses.MessageResponse;
import avg.hijob.backend.responses.ProfileResponse;
import avg.hijob.backend.responses.ResponseUser;
import avg.hijob.backend.services.FileService;
import avg.hijob.backend.services.UserService;
import jakarta.servlet.ServletContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;

@Service
public class UserServiceImp implements UserService {
    private static final Logger log = LoggerFactory.getLogger(UserServiceImp.class);
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ServletContext servletContext;

    @Autowired
    private FileService fileService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElse(null);
    }

    @Override
    public ResponseUser getCurrentUserByEmail(String email) {
        User user = findByEmail(email);
        if (user == null) {
            return null;
        }

        return new ResponseUser(user.getId(), user.getEmail(), user.getFullName(),user.getPhone());
    }

    private User getUserCurrentService() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }
        CustomUserDetail customUserDetail = (CustomUserDetail) authentication.getPrincipal();
        return customUserDetail.getUser();
    }

    @Override
    public ProfileResponse getUserCurrent() {
        User user = getUserCurrentService();
        if (user == null) {
            return null;
        }

        return new ProfileResponse(user);
    }

    @Override
    public MessageResponse updateStatus(boolean status) {
        User user = getUserCurrentService();

        if (user != null) {
            user.setJobStatus(status);
            userRepository.save(user);
            return MessageResponse
                    .builder()
                    .message("Update status successfully")
                    .type(HttpStatus.OK)
                    .build();
        }
        return MessageResponse
                .builder()
                .message("User not found, please try again.")
                .type(HttpStatus.BAD_REQUEST)
                .build();
    }


    @Override
    public FileUploadResponse updateAvatar(MultipartFile file) {
        if (file.isEmpty()) {
            return FileUploadResponse.builder().message("Please select a file!").type(HttpStatus.BAD_REQUEST).build();
        }

        User user = getUserCurrentService();
        if(user == null) {
            return FileUploadResponse.builder()
                    .message("You are not authorized to upload file Avatar!")
                    .type(HttpStatus.UNAUTHORIZED)
                    .build();
        }

        String fileName = fileService.savaFileStatic(file, "avatar");
        if (fileName != null) {
            user.setAvatar(fileName);
            userRepository.save(user);
            return FileUploadResponse.builder()
                    .message("File uploaded successfully")
                    .name(fileName)
                    .type(HttpStatus.OK)
                    .build();
        } else {
            return FileUploadResponse.builder()
                    .message("Error Upload File Please Try Again")
                    .type(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @Override
    public MessageResponse updateProfile(UpdateProfileRequest request) {
        User user = getUserCurrentService();
        if (user == null) {
            return MessageResponse.builder()
                    .message("You are not authorized to upload file Avatar!")
                    .type(HttpStatus.UNAUTHORIZED)
                    .build();
        }

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        user.setProvince(request.getProvince());
        user.setJobPosition(request.getJobPosition());
        user.setYearExperience(request.getYearExperience());
        user.setSkills(request.getSkills());
        user.setSocialNetwork1(request.getSocialNetwork1());
        user.setSocialNetwork2(request.getSocialNetwork2());

        String fileName = fileService.savaFileStatic(request.getCoverLetter(), "files");
        if (fileName != null) {
            user.setCoverLetter(fileName);
            userRepository.save(user);
            return MessageResponse.builder()
                    .message("Upload Profile Successfully")
                    .type(HttpStatus.OK)
                    .build();
        } else {
            return MessageResponse.builder()
                    .message("Error Upload File Please Try Again")
                    .type(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    @Override
    public MessageResponse changePassword(String oldPassword, String newPassword) {
        User user = getUserCurrentService();
        if (user == null) {
            return MessageResponse.builder()
                    .message("You are not authorized to change password!")
                    .type(HttpStatus.UNAUTHORIZED)
                    .build();
        }

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            return MessageResponse.builder()
                    .message("Old password is incorrect")
                    .type(HttpStatus.BAD_REQUEST)
                    .build();
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        return MessageResponse.builder()
                .message("Password changed successfully")
                .type(HttpStatus.OK)
                .build();
    }
}
