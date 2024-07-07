package avg.hijob.backend.responses;

import avg.hijob.backend.entities.User;
import lombok.*;

import java.security.Timestamp;
import java.util.Set;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseUser {
    private String id;
    private String email;
    private String phone;
    private String address;
    private String province;
    private String avatar;
    private String fullName;
    private String jobPosition;
    private int yearExperience;
    private String skills;
    private boolean isActive;
    private String socialNetwork1;
    private String socialNetwork2;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private Timestamp deletedAt;
    private ResponseRole role;
    private ResponseCompany company;
    private Set<ResponseCompanyFollow> followedCompanies;
    private Set<ResponseJob> jobs;

    public ResponseUser(String id, String email, String fullName) {
        this.id = id;
        this.email = email;
        this.fullName = fullName;
    }

    public ResponseUser(String id, String email, String fullName, String phone) {
        this.id = id;
        this.email = email;
        this.fullName = fullName;
        this.phone = phone;
    }


}