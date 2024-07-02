package avg.hijob.backend.responses;

import avg.hijob.backend.entities.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.Set;

@AllArgsConstructor
@Getter
@Setter
@Data
public class ResponseJob {
    private String id;
    private String title;
    private String description;
    private String responsibilities;
    private String requirements;
    private String benefits;
    private String requireOfYear;
    private Long salary;
    private String companyId;
    private String linkGoogleMap;
    private String userId;
    private Timestamp createdAt; // CamelCase for consistency
    private Timestamp updatedAt; // CamelCase for consistency
    private Timestamp deletedAt; // CamelCase for consistency

    public ResponseJob(String id, String title, String description, String responsibilities, String requirements, String benefits,
                       String requireOfYear, Long salary, String companyId, String userId, Timestamp createdAt, Timestamp updatedAt, Timestamp deletedAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.responsibilities = responsibilities;
        this.requirements = requirements;
        this.benefits = benefits;
        this.requireOfYear = requireOfYear;
        this.salary = salary;
        this.companyId = companyId;
        this.userId = userId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}
