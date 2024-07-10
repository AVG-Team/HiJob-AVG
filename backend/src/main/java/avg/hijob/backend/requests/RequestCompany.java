package avg.hijob.backend.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestCompany {
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

}
