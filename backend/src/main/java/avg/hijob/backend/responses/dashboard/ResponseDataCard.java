package avg.hijob.backend.responses.dashboard;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ResponseDataCard {
    private int totalJob;
    private int totalCompany;
    private int totalUser;
    private int totalEmployee;
}
