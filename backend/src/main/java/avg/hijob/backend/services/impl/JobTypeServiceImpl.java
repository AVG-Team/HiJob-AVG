package avg.hijob.backend.services.impl;

import avg.hijob.backend.exceptions.NotFoundException;
import avg.hijob.backend.repositories.JobTypeRepository;
import avg.hijob.backend.responses.ResponseJobType;
import avg.hijob.backend.services.JobTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobTypeServiceImpl implements JobTypeService {

    @Autowired
    private JobTypeRepository repository;

    @Override
    public List<ResponseJobType> findAllJobTypes() {
        if(repository.findAll().isEmpty()){
            throw  new NotFoundException("No job types found", HttpStatus.NOT_FOUND);
        }
        return repository.findAllJobTypes();
    }
}
