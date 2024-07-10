package avg.hijob.backend.requests;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class RequestJobLevelDetail {
    private String jobId;
    private Long levelId;
}
