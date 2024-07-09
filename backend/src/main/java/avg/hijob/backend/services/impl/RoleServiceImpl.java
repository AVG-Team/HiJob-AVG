package avg.hijob.backend.services.impl;

import avg.hijob.backend.entities.Role;
import avg.hijob.backend.exceptions.NotFoundException;
import avg.hijob.backend.repositories.LevelRepository;
import avg.hijob.backend.repositories.RoleRepository;
import avg.hijob.backend.responses.ResponseLevel;
import avg.hijob.backend.responses.ResponseRole;
import avg.hijob.backend.services.LevelService;
import avg.hijob.backend.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository repository;

    @Override
    public List<ResponseRole> findAllRoles() {
        List<Role> roles = repository.findAll();
        if(repository.findAll().isEmpty()){
            throw new NotFoundException("No levels found", HttpStatus.NOT_FOUND);
        }
        return roles.stream().map(role -> new ResponseRole(role.getId(), role.getName())).toList();
    }
}
