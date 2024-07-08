package avg.hijob.backend.requests;

import avg.hijob.backend.entities.*;
import lombok.*;

import java.sql.Timestamp;
import java.util.Set;

@AllArgsConstructor
@Data
public class RequestJob {
    private String title;
    private String description;
    private String responsibilities;
    private String requirements;
    private String benefits;
    private String requireOfYear;
    private Long salary;
    private String companyId;
    private String userId;

}
