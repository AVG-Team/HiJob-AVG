package avg.hijob.backend.services;

import avg.hijob.backend.entities.User;
import avg.hijob.backend.responses.FileUploadResponse;
import avg.hijob.backend.responses.MessageResponse;
import avg.hijob.backend.responses.ProfileResponse;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    User findByEmail(String email);
    ProfileResponse getUserCurrent();
    MessageResponse updateStatus(boolean status);
    FileUploadResponse updateAvatar(MultipartFile file);
}
