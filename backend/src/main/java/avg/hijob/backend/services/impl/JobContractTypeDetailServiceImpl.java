package avg.hijob.backend.services.impl;

import avg.hijob.backend.entities.ContractType;
import avg.hijob.backend.entities.ContractTypeDetail;
import avg.hijob.backend.repositories.ContractTypeRepository;
import avg.hijob.backend.repositories.JobContractTypeRepository;
import avg.hijob.backend.repositories.JobRepository;
import avg.hijob.backend.requests.RequestContractTypeDetail;
import avg.hijob.backend.responses.ResponseContractTypeDetail;
import avg.hijob.backend.services.JobContractTypeDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobContractTypeDetailServiceImpl implements JobContractTypeDetailService {

    @Autowired
    private JobContractTypeRepository jobContractTypeRepository;

    @Autowired
    private ContractTypeRepository contractTypeRepository;

    @Autowired
    private JobRepository jobRepository;

    @Override
    public List<ResponseContractTypeDetail> getAllContractTypesByJobId(String jobId) {
        if(jobContractTypeRepository.getAllContractTypesByJobId(jobId).isEmpty()) {
            throw new RuntimeException("Job Type not found");
        }else{
            return jobContractTypeRepository.getAllContractTypesByJobId(jobId);
        }
    }

    @Override
    public ResponseContractTypeDetail createContractTypeDetail(RequestContractTypeDetail request) {
        if(jobRepository.findById(request.getJobId()).isEmpty()) {
            throw new RuntimeException("Job not found");
        }
        if(contractTypeRepository.findById(request.getContractTypeId()).isEmpty()) {
            throw new RuntimeException("Contract Type not found");
        }

        ContractTypeDetail contractTypeDetail = ContractTypeDetail.builder()
                .job(jobRepository.findById(request.getJobId()).get())
                .contractType(contractTypeRepository.findById(request.getContractTypeId()).get())
                .build();

        jobContractTypeRepository.save(contractTypeDetail);

        return new  ResponseContractTypeDetail(
            contractTypeDetail.getId(),
            contractTypeDetail.getContractType().getName());
    }
}
