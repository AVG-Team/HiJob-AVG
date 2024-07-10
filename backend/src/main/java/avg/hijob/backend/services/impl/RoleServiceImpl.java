package avg.hijob.backend.services.impl;

import avg.hijob.backend.entities.Role;
import avg.hijob.backend.exceptions.NotFoundException;
import avg.hijob.backend.repositories.LevelRepository;
import avg.hijob.backend.repositories.RoleRepository;
import avg.hijob.backend.responses.ResponseLevel;
import avg.hijob.backend.responses.ResponseRole;
import avg.hijob.backend.responses.ResponseSkill;
import avg.hijob.backend.services.LevelService;
import avg.hijob.backend.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository repository;
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public List<ResponseRole> findAllRoles() {
        List<Role> roles = repository.findAll();
        if(repository.findAll().isEmpty()){
            throw new NotFoundException("No levels found", HttpStatus.NOT_FOUND);
        }
        return roles.stream().map(role -> new ResponseRole(role.getId(), role.getName())).toList();
    }

    @Override
    public Page<ResponseRole> getAllRole(Optional<Integer> pageSize, Optional<Integer> pageNo, Optional<String> q) {
        Pageable pageable = PageRequest.of(pageNo.orElse(0), pageSize.orElse(12));
        if(roleRepository.getAllRolesQuery(q.orElse(null), pageable).isEmpty()){
            throw new NotFoundException("Roles not found", HttpStatus.NOT_FOUND);
        }
        return roleRepository.getAllRolesQuery(q.orElse(null), pageable);
    }
}
