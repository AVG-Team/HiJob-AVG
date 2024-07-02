package avg.hijob.backend.services.impl;

import avg.hijob.backend.entities.Company;
import avg.hijob.backend.exceptions.NotFoundException;
import avg.hijob.backend.repositories.CompanyRepository;
import avg.hijob.backend.responses.ResponseCompany;
import avg.hijob.backend.responses.ResponseJob;
import avg.hijob.backend.services.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyServiceImpl implements CompanyService {
    @Autowired
    private CompanyRepository companyRepository;
    @Override
    public Page<ResponseCompany> getAllCompanies( Optional<Integer> pageSize, Optional<Integer> pageNo) {
        Pageable pageable = PageRequest.of(pageNo.orElse(0),pageSize.orElse(9));
        if(companyRepository.findAll().isEmpty()) {
            throw new NotFoundException("Không tìm thấy công việc nào");
        }
        return companyRepository.findAllCus(pageable);
    }

    @Override
    public Page<ResponseCompany> getAllByFilter(Optional<Integer> pageSize, Optional<Integer> pageNo, List<String> filters) {
//        Pageable pageable = isAsc ?
//                PageRequest.of(page, size, Sort.by(sortAttribute).ascending()) :
//                PageRequest.of(page, size, Sort.by(sortAttribute).descending());

        Pageable pageable = PageRequest.of(pageNo.orElse(0),pageSize.orElse(9));
        if (filters == null || filters.size() != 2) {
            return companyRepository.findAllCus(pageable);
        }
        System.out.println(filters);
        return switch (filters.get(0)) {
            case "name" ->
                      companyRepository.findAllByName( filters.get(1) , pageable);
            case "address" ->
                     companyRepository.findAllByAddress(filters.get(1), pageable);
            case "province" ->
                    companyRepository.findAllByProvince(filters.get(1), pageable);
            default ->
                   companyRepository.findAllCus(pageable);
        };
    }
}
