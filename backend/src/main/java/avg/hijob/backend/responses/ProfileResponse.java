package avg.hijob.backend.responses;

import avg.hijob.backend.entities.User;
import avg.hijob.backend.enums.UserJobStatusEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProfileResponse {
    private String id;
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private String province;
    private String avatar;
    private String jobPosition;
    private float yearExperience;
    private String skills;
    private String socialNetwork1;
    private String socialNetwork2;
    private String coverLetter;
    private boolean isActive;
    private Boolean jobStatus;

    public ProfileResponse(User user) {
        this.fullName = defaultIfNull(user.getFullName());
        this.email = defaultIfNull(user.getEmail());
        this.phone = defaultIfNull(user.getPhone());
        this.address = defaultIfNull(user.getAddress());
        this.province = defaultIfNull(user.getProvince());
        this.avatar = defaultIfNull(user.getAvatar());
        this.jobPosition = defaultIfNull(user.getJobPosition());
        this.yearExperience = user.getYearExperience();
        this.skills = defaultIfNull(user.getSkills());
        this.socialNetwork1 = defaultIfNull(user.getSocialNetwork1());
        this.socialNetwork2 = defaultIfNull(user.getSocialNetwork2());
        this.coverLetter = defaultIfNull(user.getCoverLetter());
        this.isActive = user.isActive();
        this.jobStatus = user.getJobStatus() != null && user.getJobStatus();
    }

    private String defaultIfNull(String value) {
        return value == null ? "" : value;
    }
}
