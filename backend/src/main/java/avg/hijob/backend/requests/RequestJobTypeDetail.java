package avg.hijob.backend.requests;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class RequestJobTypeDetail {
    private String jobId;
    private Long jobTypeId;
}
