package avg.hijob.backend.responses;

import lombok.*;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
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
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private Timestamp deletedAt;

}
