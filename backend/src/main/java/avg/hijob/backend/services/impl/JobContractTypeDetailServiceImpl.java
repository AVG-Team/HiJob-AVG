package avg.hijob.backend.services.impl;

import avg.hijob.backend.entities.ContractType;
import avg.hijob.backend.repositories.JobContractTypeRepository;
import avg.hijob.backend.responses.ResponseContractTypeDetail;
import avg.hijob.backend.services.JobContractTypeDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobContractTypeDetailServiceImpl implements JobContractTypeDetailService {

    @Autowired
    private JobContractTypeRepository contractTypeRepository;

    @Override
    public List<ResponseContractTypeDetail> getAllContractTypesByJobId(String jobId) {
        if(contractTypeRepository.getAllContractTypesByJobId(jobId).isEmpty()) {
            throw new RuntimeException("Job Type not found");
        }else{
            return contractTypeRepository.getAllContractTypesByJobId(jobId);
        }
    }
}
