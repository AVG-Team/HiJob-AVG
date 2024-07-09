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
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private Timestamp deletedAt;

    /*public ResponseCompany (Company company) {
        this.name = defaultIfNull(company.getName());
        this.taxCode = company.getTaxCode();
        this.field = defaultIfNull(company.getField());
        this.address = defaultIfNull(company.getAddress());
        this.province = defaultIfNull(company.getProvince());
        this.registration_certificate = defaultIfNull(company.getRegistration_certificate());
        this.about = defaultIfNull(company.getAbout());
        this.linkGoogleMap = defaultIfNull(company.getLinkGoogleMap());
        this.createdAt = company.getCreatedAt();
        this.updatedAt = company.getUpdatedAt();
        this.deletedAt = company.getDeletedAt();
        this.id = company.getId();
    }

    private String defaultIfNull(String value) {
        return value == null ? "" : value;
    }*/
}
