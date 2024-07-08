package avg.hijob.backend.services;

import avg.hijob.backend.entities.User;
import avg.hijob.backend.requests.user.UpdateProfileRequest;
import avg.hijob.backend.responses.FileUploadResponse;
import avg.hijob.backend.responses.MessageResponse;
import avg.hijob.backend.responses.UserResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
    User findByEmail(String email);
    UserResponse getUserCurrent();
    MessageResponse updateStatus(boolean status);
    FileUploadResponse updateAvatar(MultipartFile file);
    MessageResponse updateProfile(UpdateProfileRequest request);
    MessageResponse changePassword(String oldPassword, String newPassword);

    // Service for admin
    List<UserResponse> getUsers();
}
