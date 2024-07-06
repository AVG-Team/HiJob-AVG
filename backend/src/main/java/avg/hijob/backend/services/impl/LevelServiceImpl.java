package avg.hijob.backend.services.impl;

import avg.hijob.backend.exceptions.NotFoundException;
import avg.hijob.backend.repositories.LevelRepository;
import avg.hijob.backend.responses.ResponseLevel;
import avg.hijob.backend.services.LevelService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LevelServiceImpl implements LevelService {

    @Autowired
    private final LevelRepository repository;

    @Override
    public List<ResponseLevel> findAllLevels() {
        if(repository.findAll().isEmpty()){
            throw  new NotFoundException("No levels found", HttpStatus.NOT_FOUND);
        }
        return repository.findAllLevels();
    }
}
