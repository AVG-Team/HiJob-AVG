package avg.hijob.backend.services;

import avg.hijob.backend.entities.Company;
import avg.hijob.backend.responses.ResponseCompany;
import avg.hijob.backend.responses.ResponseJob;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface CompanyService {
    public Page<ResponseCompany> getAllCompanies(Optional<Integer> pageSize, Optional<Integer> pageNo);
    public Page<ResponseCompany> getAllByFilter(Optional<Integer> pageSize, Optional<Integer> pageNo, List<String> filters);
}
