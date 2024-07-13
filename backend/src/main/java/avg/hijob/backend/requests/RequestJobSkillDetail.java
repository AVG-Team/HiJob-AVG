package avg.hijob.backend.requests;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class RequestJobSkillDetail {
    private String jobId;
    private Long skillId;
}
