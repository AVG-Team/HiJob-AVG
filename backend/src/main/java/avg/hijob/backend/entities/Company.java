package avg.hijob.backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;

    @Column(name = "tax_code")
    private int taxCode;

    private String field;

    private String address;
    private String province;

    // path image registration certificate of company notarized
    private String registration_certificate;

    private String about;

    @Column(name = "link_google_map" , nullable = true)
    private String linkGoogleMap;

    @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "employer_id")
    private User user;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = false)
    private Set<CompanyFollow> followers = new HashSet<>();

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Job> jobs = new HashSet<>();

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
