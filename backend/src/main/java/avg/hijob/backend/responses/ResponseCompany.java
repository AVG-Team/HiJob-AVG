package avg.hijob.backend.responses;

import avg.hijob.backend.entities.Company;
import avg.hijob.backend.entities.User;
import lombok.*;

import java.sql.Timestamp;

import static org.apache.commons.lang3.ObjectUtils.defaultIfNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ResponseCompany {
    private String id;
    private String name;
    private int taxCode;
    private String field;
    private String address;
    private String province;
    private String registration_certificate;
    private String about;
    private String linkGoogleMap;
    private String employer_id;
    private String logo;
    private String banner;
    private String benefit;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private Timestamp deletedAt;
    private String employer_name;
}
