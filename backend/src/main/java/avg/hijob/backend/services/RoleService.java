package avg.hijob.backend.services;

import avg.hijob.backend.entities.Role;
import avg.hijob.backend.responses.ResponseLevel;
import avg.hijob.backend.responses.ResponseRole;

import java.util.List;


public interface RoleService {
    public List<ResponseRole> findAllRoles();
}
