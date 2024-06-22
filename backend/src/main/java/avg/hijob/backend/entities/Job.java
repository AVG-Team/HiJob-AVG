package avg.hijob.backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    private String responsibilities;
    private String requirements;
    private String benefits;

    @Column(name = "require_of_year", nullable = false)
    private String requireOfYear;

    @Column(nullable = false)
    private Long salary;

    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<JobLevelDetail> levels = new HashSet<>();

    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<JobTypeDetail> jobTypes = new HashSet<>();

    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ContractTypeDetail> contractTypes = new HashSet<>();

    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<JobSkillDetail> skills = new HashSet<>();
}
