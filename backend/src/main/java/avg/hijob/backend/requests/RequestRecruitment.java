package avg.hijob.backend.requests;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class RequestRecruitment {
    private String userId;
    private String jobId;
    private int status;
    private String cv;
    private String coverLetter;
}
