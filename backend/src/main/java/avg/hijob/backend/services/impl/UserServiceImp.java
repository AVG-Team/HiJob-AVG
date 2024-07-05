package avg.hijob.backend.services.impl;

import avg.hijob.backend.entities.CustomUserDetail;
import avg.hijob.backend.entities.User;
import avg.hijob.backend.repositories.UserRepository;
import avg.hijob.backend.responses.FileUploadResponse;
import avg.hijob.backend.responses.MessageResponse;
import avg.hijob.backend.responses.ProfileResponse;
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

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElse(null);
    }

    @Override
    public ProfileResponse getUserCurrent() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            CustomUserDetail customUserDetail = (CustomUserDetail) authentication.getPrincipal();

            User user = customUserDetail.getUser();
            return new ProfileResponse(user);
        }

        return null;
    }

    @Override
    public MessageResponse updateStatus(boolean status) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            CustomUserDetail customUserDetail = (CustomUserDetail) authentication.getPrincipal();

            User user = customUserDetail.getUser();
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
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return FileUploadResponse.builder()
                    .message("You are not authorized to upload file Avatar!")
                    .type(HttpStatus.BAD_REQUEST)
                    .build();
        }
        CustomUserDetail customUserDetail = (CustomUserDetail) authentication.getPrincipal();
        User user = customUserDetail.getUser();

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
}
