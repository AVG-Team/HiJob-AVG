package avg.hijob.backend.responses.dashboard;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ResponseTop5Company {
    private String id;
    private String name;
    private String field;
    private String employer_name;
    private Long follow;
}
