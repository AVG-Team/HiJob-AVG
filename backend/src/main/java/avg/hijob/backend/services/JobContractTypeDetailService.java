package avg.hijob.backend.services;

import avg.hijob.backend.entities.ContractType;
import avg.hijob.backend.requests.RequestContractTypeDetail;
import avg.hijob.backend.responses.ResponseContractTypeDetail;

import java.util.List;

public interface JobContractTypeDetailService {
    public List<ResponseContractTypeDetail> getAllContractTypesByJobId(String jobId);
    public ResponseContractTypeDetail createContractTypeDetail(RequestContractTypeDetail request);
}
