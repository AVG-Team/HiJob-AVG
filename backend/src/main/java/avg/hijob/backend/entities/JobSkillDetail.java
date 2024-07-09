package avg.hijob.backend.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Document(indexName = "jobskilldetail")
public class JobSkillDetail {
    @Id
    @org.springframework.data.annotation.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "job_id", nullable = false)
    @Field(name = "job", type = FieldType.Nested)
    private Job job;

    @ManyToOne
    @JoinColumn(name = "skill_id", nullable = false)
    @Field(name = "skillName", type = FieldType.Nested)
    private Skill skill;
}
