package avg.hijob.backend.services.impl;

import avg.hijob.backend.exceptions.NotFoundException;
import avg.hijob.backend.repositories.JobRepository;
import avg.hijob.backend.responses.ResponseJob;
import avg.hijob.backend.services.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    @Autowired
    private final JobRepository jobRepository;



    @Override
    public Page<ResponseJob> getAllJobs(Optional<String> companyId, Optional<Integer> pageSize, Optional<Integer> pageNo) {
        Pageable pageable = PageRequest.of(pageNo.orElse(0),pageSize.orElse(9));
        if(jobRepository.findAll().isEmpty()) {
            throw new NotFoundException("Không tìm thấy công việc nào");
        }
        return jobRepository.findAllOrCompanyId(companyId.orElse(""),pageable);

    }
}
