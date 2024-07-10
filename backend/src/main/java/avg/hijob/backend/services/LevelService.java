package avg.hijob.backend.services;

import avg.hijob.backend.requests.RequestLevel;
import avg.hijob.backend.responses.ResponseLevel;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;


public interface LevelService {
    public List<ResponseLevel> findAllLevels();
    public ResponseLevel getLevelById(Integer id);
    Page<ResponseLevel> getAllLevel(Optional<Integer> pageSize, Optional<Integer> pageNo, Optional<String> q);
    public ResponseLevel createLevel(RequestLevel requestLevel);
    public ResponseLevel updateLevel(Long id, RequestLevel requestLevel);
    public ResponseLevel deleteLevel(Long id);
}
