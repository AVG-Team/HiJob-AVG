package avg.hijob.backend.services.impl;

import avg.hijob.backend.exceptions.NotFoundException;
import avg.hijob.backend.repositories.ContractTypeRepository;
import avg.hijob.backend.responses.ResponseContractType;
import avg.hijob.backend.services.ContractTypeService;
import lombok.RequiredArgsConstructor;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContractTypeServiceImpl implements ContractTypeService {

    @Autowired
    private ContractTypeRepository repository;

    @Override
    public List<ResponseContractType> findAllContractTypes() {
        if(repository.findAll().isEmpty()){
            throw  new NotFoundException("No contract types found", HttpStatus.NOT_FOUND);
        }
        return repository.findAllContractTypes();
    }
}
