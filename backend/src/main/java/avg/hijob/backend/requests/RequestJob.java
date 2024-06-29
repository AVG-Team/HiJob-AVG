package avg.hijob.backend.requests;

import avg.hijob.backend.entities.*;
import lombok.*;

import java.sql.Timestamp;
import java.util.Set;

@AllArgsConstructor
@Data
public class RequestJob {
    private String id;
    private String title;
    private String description;
    private String responsibilities;
    private String requirements;
    private String benefits;
    private String requireOfYear;
    private Long salary;
    private Set<JobLevelDetail> levels; // Note the plural 'levels'
    private Set<JobTypeDetail> jobTypes; // Note the plural 'jobTypes'
    private Set<ContractTypeDetail> contractTypes; // Note the plural 'contractTypes'
    private Set<JobSkillDetail> skills;
    private Company company;
    private User user;
    private Timestamp createdAt; // CamelCase for consistency
    private Timestamp updatedAt; // CamelCase for consistency
    private Timestamp deletedAt; // CamelCase for consistency

}
