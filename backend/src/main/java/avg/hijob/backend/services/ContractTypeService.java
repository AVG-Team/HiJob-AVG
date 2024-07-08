package avg.hijob.backend.services;

import avg.hijob.backend.responses.ResponseContractType;

import java.util.List;

public interface ContractTypeService {
    public List<ResponseContractType> findAllContractTypes();
}
