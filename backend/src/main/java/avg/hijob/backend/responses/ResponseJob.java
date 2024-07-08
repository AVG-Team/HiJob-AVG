package avg.hijob.backend.responses;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.Set;


import lombok.*;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
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
    private String userId;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private Timestamp deletedAt;


}
