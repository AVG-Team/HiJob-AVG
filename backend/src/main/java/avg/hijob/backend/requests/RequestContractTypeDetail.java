package avg.hijob.backend.requests;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class RequestContractTypeDetail {

    private String jobId;
    private Integer contractTypeId;
}
