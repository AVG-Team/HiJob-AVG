package avg.hijob.backend.responses;

import lombok.*;

import java.sql.Timestamp;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResponseRecruitment {
    private String id;
    private String userId;
    private String jobId;
    private int status;
    private String cv;
    private String coverLetter;
    private Timestamp appliedAt;
    private Timestamp deletedAt;
}
