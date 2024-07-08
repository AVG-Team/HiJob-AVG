package avg.hijob.backend.services;

import avg.hijob.backend.responses.ResponseJobType;

import java.util.List;

public interface JobTypeService {
    public List<ResponseJobType> findAllJobTypes();
}
