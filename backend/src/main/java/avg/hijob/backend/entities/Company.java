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

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CompanyFollow> followers = new HashSet<>();
}
