package avg.hijob.backend.requests.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateProfileRequest {
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private String province;
    private String jobPosition;
    private float yearExperience;
    private String skills;
    private String socialNetwork1;
    private String socialNetwork2;
    private MultipartFile coverLetter;
}
