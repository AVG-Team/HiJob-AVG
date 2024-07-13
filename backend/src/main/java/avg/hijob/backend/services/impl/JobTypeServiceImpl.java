package avg.hijob.backend.services.impl;

import avg.hijob.backend.entities.JobType;
import avg.hijob.backend.entities.Skill;
import avg.hijob.backend.exceptions.NotFoundException;
import avg.hijob.backend.repositories.JobTypeRepository;
import avg.hijob.backend.requests.RequestJobType;
import avg.hijob.backend.requests.RequestSkill;
import avg.hijob.backend.responses.ResponseJobType;
import avg.hijob.backend.responses.ResponseSkill;
import avg.hijob.backend.services.JobTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class JobTypeServiceImpl implements JobTypeService {

    @Autowired
    private JobTypeRepository repository;
    @Autowired
    private JobTypeRepository jobTypeRepository;

    @Override
    public List<ResponseJobType> findAllJobTypes() {
        if(repository.findAll().isEmpty()){
            throw  new NotFoundException("No job types found", HttpStatus.NOT_FOUND);
        }
        return repository.findAllJobTypes();
    }

    @Override
    public ResponseJobType getJobTypeById(Integer id) {
        /*if(jobTypeRepository.findById(id).isEmpty()){
            throw new NotFoundException("Job Type not found", HttpStatus.NOT_FOUND);
        }*/
        return jobTypeRepository.findByIds(id);
    }

    @Override
    public Page<ResponseJobType> getAllJobType(Optional<Integer> pageSize, Optional<Integer> pageNo, Optional<String> q) {
        Pageable pageable = PageRequest.of(pageNo.orElse(0), pageSize.orElse(12));
        if(jobTypeRepository.getAllJobTypesQuery(q.orElse(null), pageable).isEmpty()){
            throw new NotFoundException("Job Type not found", HttpStatus.NOT_FOUND);
        }
        return jobTypeRepository.getAllJobTypesQuery(q.orElse(null), pageable);
    }

    @Transactional
    @Override
    public ResponseJobType createJobType(RequestJobType requestJobType) {
        try{
            ResponseJobType existingJobType = jobTypeRepository.findByName(requestJobType.getTypeName());
            if (existingJobType != null) {
                throw new NotFoundException("Job Type already exists", HttpStatus.BAD_REQUEST);
            }

            JobType jobType = JobType.builder()
                    .name(requestJobType.getTypeName())
                    .build();
            jobTypeRepository.save(jobType);
            return jobTypeRepository.findByIds(jobType.getId());
        }catch (Exception e){
            System.out.println(e.getMessage());
            throw new NotFoundException("Error creating Job Type", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseJobType updateJobType(Long id, RequestJobType requestJobType) {
        try{
            ResponseJobType existingJobType = jobTypeRepository.findByName(requestJobType.getTypeName());
            if (existingJobType != null) {
                throw new NotFoundException("Job Type already exists", HttpStatus.BAD_REQUEST);
            }

            JobType jobType = jobTypeRepository.findById(id).get();
            jobType.setName(requestJobType.getTypeName());
            jobTypeRepository.save(jobType);
            return jobTypeRepository.findByIds(jobType.getId());
        }catch (Exception e){
            throw new NotFoundException("Error updating Job Type", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseJobType deleteJobType(Long id) {
        try{
            if(jobTypeRepository.findById(id).isEmpty()){
                throw new NotFoundException("Job Type not found", HttpStatus.NOT_FOUND);
            }else{
                JobType jobType = jobTypeRepository.findById(id).get();
                jobTypeRepository.deleteById(id);
                return jobTypeRepository.findByIds(jobType.getId());
            }

        }catch (Exception e){
            throw new NotFoundException("Error deleting Job Type", HttpStatus.BAD_REQUEST);
        }
    }
}
