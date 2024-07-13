package avg.hijob.backend.services;

import avg.hijob.backend.entities.Role;
import avg.hijob.backend.responses.ResponseLevel;
import avg.hijob.backend.responses.ResponseRole;
import avg.hijob.backend.responses.ResponseSkill;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;


public interface RoleService {
    public List<ResponseRole> findAllRoles();
    Page<ResponseRole> getAllRole(Optional<Integer> pageSize, Optional<Integer> pageNo, Optional<String> q);
}
