package avg.hijob.backend.services;

import avg.hijob.backend.responses.ResponseLevel;

import java.util.List;


public interface LevelService {
    public List<ResponseLevel> findAllLevels();
}
