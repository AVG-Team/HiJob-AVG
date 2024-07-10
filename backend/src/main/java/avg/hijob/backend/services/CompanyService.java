package avg.hijob.backend.services;

import avg.hijob.backend.requests.RequestCompany;
import avg.hijob.backend.responses.FileUploadResponse;
import avg.hijob.backend.responses.MessageResponse;
import avg.hijob.backend.responses.ResponseCompany;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface CompanyService {
    public Page<ResponseCompany> getAllCompanies(Optional<Integer> pageSize, Optional<Integer> pageNo);
    public ResponseCompany getCompanyById(String id);
    public ResponseCompany getCompanyByUser(String userId);
    public List<ResponseCompany> getTop5Companies();
    public MessageResponse createCompany(RequestCompany requestCompany);
    public MessageResponse updateCompany(String id, RequestCompany requestCompany);
    public ResponseCompany deleteCompany(String id);
}