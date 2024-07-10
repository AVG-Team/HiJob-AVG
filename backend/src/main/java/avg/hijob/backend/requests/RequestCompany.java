package avg.hijob.backend.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestCompany {
    private String name;
    private int taxCode;
    private String field;
    private String address;
    private String province;
    private MultipartFile registration_certificate;
    private String about;
    private String linkGoogleMap;
    private String employer_id;
    private MultipartFile logo;
    private MultipartFile banner;
    private String benefit;

}
