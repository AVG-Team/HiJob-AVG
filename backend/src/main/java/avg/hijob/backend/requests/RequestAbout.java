package avg.hijob.backend.requests;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestAbout {
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
