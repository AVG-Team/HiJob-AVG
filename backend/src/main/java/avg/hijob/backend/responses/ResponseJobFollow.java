package avg.hijob.backend.responses;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Data
public class ResponseJobFollow {
    private Long id;
    private String userId;
    private String jobId;
}
