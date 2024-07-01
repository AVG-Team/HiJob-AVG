package avg.hijob.backend.services;

import avg.hijob.backend.requests.RequestCompany;
import avg.hijob.backend.responses.ResponseCompany;
import org.springframework.data.domain.Page;

import java.util.Optional;

public interface CompanyService {
    public Page<ResponseCompany> getAllCompanies(Optional<Integer> pageSize, Optional<Integer> pageNo);
    public ResponseCompany getCompanyById(String id);
    public ResponseCompany getCompanyByUser(String userId);
    public ResponseCompany createCompany(RequestCompany requestCompany);
    public ResponseCompany updateCompany(String id, RequestCompany requestCompany);
    public ResponseCompany deleteCompany(String id);
}