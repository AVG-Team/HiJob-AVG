package avg.hijob.backend.services.impl;

import avg.hijob.backend.entities.CustomUserDetail;
import avg.hijob.backend.entities.Role;
import avg.hijob.backend.entities.User;
import avg.hijob.backend.repositories.RoleRepository;
import avg.hijob.backend.repositories.UserRepository;
import avg.hijob.backend.requests.user.SearchUsersRequest;
import avg.hijob.backend.requests.user.UpdateProfileRequest;
import avg.hijob.backend.responses.*;
import avg.hijob.backend.services.EmailService;
import avg.hijob.backend.services.FileService;
import avg.hijob.backend.services.UserService;
import jakarta.servlet.ServletContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;
import java.util.Random;

@Service
public class UserServiceImp implements UserService {
    private static final Logger log = LoggerFactory.getLogger(UserServiceImp.class);
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private ServletContext servletContext;

    @Autowired
    private FileService fileService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

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
    public ResponseUsers getUserCurrent() {
        User user = getUserCurrentService();
        if (user == null) {
            return null;
        }

        return new ResponseUsers(user);
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
        if (user == null) {
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
        if (request.getBirthday() != null) {
            user.setBirthday(LocalDate.parse(request.getBirthday()));
        }

        if (request.getCoverLetter() != null) {
            String fileName = fileService.savaFileStatic(request.getCoverLetter(), "files");
            if (fileName != null) {
                user.setCoverLetter(fileName);
            } else {
                return MessageResponse.builder()
                        .message("Error Upload File Please Try Again")
                        .type(HttpStatus.BAD_REQUEST)
                        .build();
            }
        }
        userRepository.save(user);
        return MessageResponse.builder()
                .message("Upload Profile Successfully")
                .type(HttpStatus.OK)
                .build();
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

    @Override
    public ResponseUsersPage getUsers(SearchUsersRequest request) {
        int page = (request.getPage() == null || request.getPage().isEmpty()) ? 0 : Integer.parseInt(request.getPage());
        int totalPage = (request.getSize() == null || request.getSize().isEmpty()) ? 15 : Integer.parseInt(request.getSize());
        Boolean active = (request.getActive() == null || request.getActive().isEmpty()) ? null : (request.getActive().equals("1"));
//        Boolean deleted = (request.getDeleted() == null || request.getDeleted().isEmpty()) ? null : (request.getDeleted().equals("1"));
        Integer age = (request.getAge() == null || request.getAge().isEmpty()) ? null : Integer.parseInt(request.getAge());
        Integer role = (request.getRole() == null || request.getRole().isEmpty()) ? null : Integer.parseInt(request.getRole());

        Pageable pageable = PageRequest.of(page, totalPage);
        Page<User> usersPage = userRepository.searchUsers(
                request.getQ(),
                request.getCompany(),
                request.getJobPosition(),
                request.getProvince(),
                active,
                role,
                age == null ? null : LocalDate.now().getYear() - age,
//                deleted,
                pageable
        );

        List<ResponseUsers> users = usersPage.map(ResponseUsers::new).getContent();

        return ResponseUsersPage.builder()
                .users(users)
                .totalResults(usersPage.getTotalElements())
                .resultsPerPage(usersPage.getSize())
                .currentPage(usersPage.getNumber())
                .totalPages(usersPage.getTotalPages())
                .build();
    }

    @Override
    public ResponseUsers getUserById(String id) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            return null;
        }

        return new ResponseUsers(user);
    }

    private MessageResponse saveUser(UpdateProfileRequest request, User user, boolean create) {
        boolean active = request.getActive() == null || request.getActive().isEmpty() || (request.getActive().equals("1"));
        Boolean jobStatus = request.getJobStatus() == null || request.getJobStatus().isEmpty() || (request.getJobStatus().equals("1"));

        user.setFullName(request.getFullName());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        user.setProvince(request.getProvince());
        user.setJobPosition(request.getJobPosition());
        user.setYearExperience(request.getYearExperience());
        user.setSkills(request.getSkills());
        user.setSocialNetwork1(request.getSocialNetwork1());
        user.setSocialNetwork2(request.getSocialNetwork2());
        user.setActive(active);
        user.setJobStatus(jobStatus);
        if (request.getBirthday() != null) {
            user.setBirthday(LocalDate.parse(request.getBirthday()));
        }

        if (request.getCoverLetter() != null) {
            String fileName = fileService.savaFileStatic(request.getCoverLetter(), "files");
            if (fileName != null) {
                user.setCoverLetter(fileName);
            } else {
                return MessageResponse.builder()
                        .message("Error Upload File Please Try Again")
                        .type(HttpStatus.BAD_REQUEST)
                        .build();
            }
        }

        if (request.getAvatar() != null) {
            String fileName = fileService.savaFileStatic(request.getAvatar(), "avatar");
            if (fileName != null) {
                user.setAvatar(fileName);
            } else {
                return MessageResponse.builder()
                        .message("Error Upload File Please Try Again")
                        .type(HttpStatus.BAD_REQUEST)
                        .build();
            }
        }

        if (create) {
            user.setEmail(request.getEmail());
            Role role = roleRepository.findById(1)
                    .orElse(roleRepository.findFirstByOrderByIdAsc());

            String password = "AVG_" + new Random().nextInt(1000) + "_HIJOB";

            String passwordEnc = passwordEncoder.encode(password);
            user.setPassword(passwordEnc);
            user.setRole(role);
            userRepository.save(user);

            try {
                System.out.println("Send mail : " + request.getEmail() + " ; full name : " + request.getFullName() + " ; password : " + password);
                emailService.sendEmailRegisterWithPassword(request.getEmail(), request.getFullName(), password);
            } catch (Exception e) {
                System.out.println("error send mail: " + e.getMessage());
            }
        } else {
            userRepository.save(user);
        }

        return MessageResponse.builder()
                .message("Upload Profile Successfully")
                .type(HttpStatus.OK)
                .build();
    }


    @Override
    public MessageResponse createUser(UpdateProfileRequest request) {
        if (request.getEmail() == null || request.getEmail().isEmpty()) {
            return MessageResponse.builder()
                    .message("Email is required")
                    .type(HttpStatus.BAD_REQUEST)
                    .build();
        }

        User userCheck = userRepository.findByEmail(request.getEmail()).orElse(null);
        if (userCheck != null) {
            return MessageResponse.builder()
                    .message("Email already exists")
                    .type(HttpStatus.BAD_REQUEST)
                    .build();
        }

        User userCheckPhone = userRepository.findByPhone(request.getPhone()).orElse(null);
        if (userCheckPhone != null) {
            return MessageResponse.builder()
                    .message("Phone already exists")
                    .type(HttpStatus.BAD_REQUEST)
                    .build();
        }

        User user = new User();
        return saveUser(request, user, true);
    }

    @Override
    public MessageResponse saveUser(UpdateProfileRequest request, String id) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            return MessageResponse.builder()
                    .message("User not found")
                    .type(HttpStatus.UNAUTHORIZED)
                    .build();
        }

        return saveUser(request, user, false);
    }

    // làm soft delete sau
    @Override
    public MessageResponse deleteUser(String id) {
        try {
            userRepository.deleteById(id);

            return MessageResponse.builder()
                    .message("Delete user successfully")
                    .type(HttpStatus.OK)
                    .build();
        } catch (Exception e) {
            return MessageResponse.builder()
                    .message("Error deleting user: " + e.getMessage())
                    .type(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
        }
    }
}
