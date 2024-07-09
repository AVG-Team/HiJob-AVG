package avg.hijob.backend.requests.user;

import javax.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateProfileRequest {
    private String fullName;
    private String email;
    private String phone;
    private String birthday;
    private String address;
    private String province;
    private String jobPosition;
    private float yearExperience;
    private String skills;
    private String socialNetwork1;
    private String socialNetwork2;
    @Nullable
    private MultipartFile coverLetter;
    private MultipartFile avatar;
    private String active;
    private String jobStatus;
}
