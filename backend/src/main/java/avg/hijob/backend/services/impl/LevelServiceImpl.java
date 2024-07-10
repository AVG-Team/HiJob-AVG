package avg.hijob.backend.services.impl;

import avg.hijob.backend.entities.Level;
import avg.hijob.backend.exceptions.NotFoundException;
import avg.hijob.backend.repositories.LevelRepository;
import avg.hijob.backend.requests.RequestLevel;
import avg.hijob.backend.responses.ResponseLevel;
import avg.hijob.backend.services.LevelService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LevelServiceImpl implements LevelService {

    @Autowired
    private LevelRepository repository;
    @Autowired
    private LevelRepository levelRepository;

    @Override
    public List<ResponseLevel> findAllLevels() {
        if(repository.findAll().isEmpty()){
            throw  new NotFoundException("No levels found", HttpStatus.NOT_FOUND);
        }
        return repository.findAllLevels();
    }

    @Override
    public ResponseLevel getLevelById(Integer id) {
        /*if(levelRepository.findById(id).isEmpty()){
            throw new NotFoundException("Skill not found", HttpStatus.NOT_FOUND);
        }*/
        return levelRepository.findByIds(id);
    }

    @Override
    public Page<ResponseLevel> getAllLevel(Optional<Integer> pageSize, Optional<Integer> pageNo, Optional<String> q) {
        Pageable pageable = PageRequest.of(pageNo.orElse(0), pageSize.orElse(12));
        if(levelRepository.getAllLevelQuery(q.orElse(null), pageable).isEmpty()){
            throw new NotFoundException("Levels not found", HttpStatus.NOT_FOUND);
        }
        return levelRepository.getAllLevelQuery(q.orElse(null), pageable);
    }

    @Override
    public ResponseLevel createLevel(RequestLevel requestLevel) {
        try{
            ResponseLevel existingLevel = levelRepository.findByName(requestLevel.getLevelName());
            if (existingLevel != null) {
                throw new NotFoundException("Level already exists", HttpStatus.BAD_REQUEST);
            }

            Level level = Level.builder()
                    .name(requestLevel.getLevelName())
                    .build();
            levelRepository.save(level);
            return levelRepository.findByIds(level.getId());
        }catch (Exception e){
            System.out.println(e.getMessage());
            throw new NotFoundException("Error creating level", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseLevel updateLevel(Long id, RequestLevel requestLevel) {
        try{
            ResponseLevel existingLevel = levelRepository.findByName(requestLevel.getLevelName());
            if (existingLevel != null) {
                throw new NotFoundException("Level already exists", HttpStatus.BAD_REQUEST);
            }

            Level level = levelRepository.findById(id).get();
            level.setName(requestLevel.getLevelName());
            levelRepository.save(level);
            return levelRepository.findByIds(level.getId());
        }catch (Exception e){
            throw new NotFoundException("Error updating level", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseLevel deleteLevel(Long id) {
        try{
            if(levelRepository.findById(id).isEmpty()){
                throw new NotFoundException("Level not found", HttpStatus.NOT_FOUND);
            }
            else{
                Level level = levelRepository.findById(id).get();
                levelRepository.deleteById(id);
                return levelRepository.findByIds(level.getId());
            }

        }catch (Exception e){
            throw new NotFoundException("Error deleting level", HttpStatus.BAD_REQUEST);
        }
    }
}
