package avg.hijob.backend.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Document(indexName = "Job")
@Data
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Field(type = FieldType.Keyword, name = "id")
    private String id;

    @Column(nullable = false)
    @Field(type = FieldType.Text, name = "title")
    private String title;

    @Column(nullable = false)
    @Field(type = FieldType.Text, name = "description")
    private String description;

    @Field(type = FieldType.Text, name = "responsibilities")
    private String responsibilities;
    @Field(type = FieldType.Text, name = "requirements")
    private String requirements;

    @Field(type = FieldType.Text, name = "benefits")
    private String benefits;

    @Column(name = "require_of_year", nullable = false)
    @Field(type = FieldType.Text, name = "benefits")
    private String requireOfYear;

    @Column(nullable = false)
    @Field(type = FieldType.Text, name = "benefits")
    private Long salary;

    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL, orphanRemoval = false)
    private Set<JobLevelDetail> levels = new HashSet<>();

    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL, orphanRemoval = false)
    private Set<JobTypeDetail> jobTypes = new HashSet<>();

    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL, orphanRemoval = false)
    private Set<ContractTypeDetail> contractTypes = new HashSet<>();

    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL, orphanRemoval = false)
    private Set<JobSkillDetail> skills = new HashSet<>();

    @ManyToOne(targetEntity = Company.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "company_id")
    private Company company;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    @Field(type = FieldType.Nested, name = "user_id")
    private User user;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp createdAt;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp updatedAt;

    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp deletedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = new Timestamp(System.currentTimeMillis());
        updatedAt = new Timestamp(System.currentTimeMillis());
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = new Timestamp(System.currentTimeMillis());
    }

    @PreRemove
    protected void onDelete() {
        deletedAt = new Timestamp(System.currentTimeMillis());
    }


}
