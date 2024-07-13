package avg.hijob.backend.responses;

import avg.hijob.backend.entities.Company;
import lombok.*;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ResponseCompanyWithEmployeeName {
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
    private String employeeName;

    public ResponseCompanyWithEmployeeName (Company company) {
        this.id = company.getId();
        this.name = defaultIfNull(company.getName());
        this.taxCode = company.getTaxCode();
        this.field = defaultIfNull(company.getField());
        this.address = defaultIfNull(company.getAddress());
        this.province = defaultIfNull(company.getProvince());
        this.registration_certificate = defaultIfNull(company.getRegistration_certificate());
        this.about = defaultIfNull(company.getAbout());
        this.linkGoogleMap = defaultIfNull(company.getLinkGoogleMap());
        this.employer_id = company.getUser().getId();
        this.createdAt = company.getCreatedAt();
        this.updatedAt = company.getUpdatedAt();
        this.deletedAt = company.getDeletedAt();
        this.employeeName = company.getUser().getFullName();
    }

    private String defaultIfNull(String value) {
        return value == null ? "" : value;
    }
}
