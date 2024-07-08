package avg.hijob.backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Table(name = "recruitment")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Recruitment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name ="user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name ="job_id", nullable = false)
    private Job job;

    private int status;

    @Column(nullable = false)
    private String cv;

    @Column(nullable = false)
    private String coverLetter;

    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp appliedAt;

    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp deletedAt;

    @PrePersist
    protected void onCreate() {
        appliedAt= new Timestamp(System.currentTimeMillis());
    }
}
