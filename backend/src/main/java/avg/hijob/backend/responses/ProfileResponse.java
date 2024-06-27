package avg.hijob.backend.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProfileResponse {
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private String province;
    private String avatar;
    private String jobPosition;
    private int yearExperience;
    private String skills;
    private String socialNetwork1;
    private String socialNetwork2;
    private String coverLetter;
}
