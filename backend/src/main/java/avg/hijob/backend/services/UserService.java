package avg.hijob.backend.services;

import avg.hijob.backend.entities.User;
import avg.hijob.backend.requests.user.SearchUsersRequest;
import avg.hijob.backend.requests.user.UpdateProfileRequest;
import avg.hijob.backend.responses.*;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    User findByEmail(String email);
    ResponseUser getCurrentUserByEmail(String email);
    ResponseUsers getUserCurrent();
    MessageResponse updateStatus(boolean status);
    FileUploadResponse updateAvatar(MultipartFile file);
    MessageResponse updateProfile(UpdateProfileRequest request);
    MessageResponse changePassword(String oldPassword, String newPassword);

    // Service for admin
//    List<UserResponse> getAllUsers();
    ResponseUsersPage getUsers(SearchUsersRequest request);
    ResponseUsers getUserById(String id);
    MessageResponse createUser(UpdateProfileRequest request);
    MessageResponse saveUser(UpdateProfileRequest request, String id);
    MessageResponse deleteUser(String id);
}
