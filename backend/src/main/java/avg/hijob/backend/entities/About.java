package avg.hijob.backend.entities;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class About {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;
    private String nameCompany;
    private String address;
    @Column(columnDefinition = "LONGTEXT")
    private String iframeGoogleMap;
    private String phone;
    private String email;
    private String website;
    @Column(columnDefinition = "LONGTEXT")
    private String description;
}
