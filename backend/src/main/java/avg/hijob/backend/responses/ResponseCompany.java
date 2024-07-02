package avg.hijob.backend.responses;

import avg.hijob.backend.entities.CompanyFollow;
import avg.hijob.backend.entities.Job;
import avg.hijob.backend.entities.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;
@AllArgsConstructor
@Getter
@Setter
@Data
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
    private Timestamp createdAt; // CamelCase for consistency
    private Timestamp updatedAt; // CamelCase for consistency
    private Timestamp deletedAt; // CamelCase for consistency
}
