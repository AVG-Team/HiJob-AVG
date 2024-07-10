package avg.hijob.backend.services.impl;

import avg.hijob.backend.entities.Company;
import avg.hijob.backend.exceptions.NotFoundException;
import avg.hijob.backend.repositories.CompanyRepository;
import avg.hijob.backend.repositories.JobRepository;
import avg.hijob.backend.repositories.UserRepository;
import avg.hijob.backend.requests.RequestCompany;
import avg.hijob.backend.responses.MessageResponse;
import avg.hijob.backend.responses.ResponseCompany;
import avg.hijob.backend.services.CompanyService;
import avg.hijob.backend.services.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;


@Service
public class CompanyServiceImpl implements CompanyService {
    @Autowired
    private  CompanyRepository companyRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JobRepository jobRepository;
    @Autowired
    private FileService fileService;


    @Override
    public Page<ResponseCompany> getAllCompanies(Optional<Integer> pageSize, Optional<Integer> pageNo) {
        Pageable pageable = PageRequest.of(pageNo.orElse(0), pageSize.orElse(9));
        if(companyRepository.findAll().isEmpty()){
            throw new NotFoundException("No companies found", HttpStatus.NOT_FOUND);
        }
        return companyRepository.getAllCompanies(pageable);
    }

    @Override
    public ResponseCompany getCompanyById(String id) {
        if(companyRepository.findById(id).isEmpty()){
            throw new NotFoundException("Company not found", HttpStatus.NOT_FOUND);
        }
        return companyRepository.getCompanyById(id);
    }

    @Override
    public ResponseCompany getCompanyByUser(String userId) {
        if(companyRepository.existsByUser(userRepository.getReferenceById(userId))){
            return companyRepository.getCompanyByUserId(userId);
        }else{
            throw new NotFoundException("Company not found", HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public List<ResponseCompany> getTop5Companies() {
        Pageable pageable = PageRequest.of(0,5);
        if(companyRepository.findAll().isEmpty()){
            throw new NotFoundException("No companies found", HttpStatus.NOT_FOUND);
        }
        return companyRepository.getTop5Company();
    }

    @Override
    public MessageResponse createCompany(RequestCompany requestCompany) {
//        try{
        System.out.println(requestCompany.toString());
            if(companyRepository.existsByUser(userRepository.getReferenceById(requestCompany.getEmployer_id()))){
                throw new NotFoundException("Company already exists", HttpStatus.BAD_REQUEST);
            }else{
                System.out.println("133");
                System.out.println(requestCompany.toString());
                String certiFile = fileService.savaFileStatic(requestCompany.getRegistration_certificate(), "certificate-url");
                String logoFile = fileService.savaFileStatic(requestCompany.getLogo(), "logo-url");
                String bannerFile = fileService.savaFileStatic(requestCompany.getBanner(), "banner-url");
                if(certiFile.isEmpty() || logoFile.isEmpty() || bannerFile.isEmpty()){
                    return MessageResponse.builder()
                            .message("Error Upload File Please Try Again")
                            .type(HttpStatus.BAD_REQUEST)
                            .build();
                }else{
                    System.out.println("11");
                    System.out.println(requestCompany.toString());
                    Company company = Company.builder()
                            .name(requestCompany.getName())
                            .taxCode(requestCompany.getTaxCode())
                            .field(requestCompany.getField())
                            .address(requestCompany.getAddress())
                            .province(requestCompany.getProvince())
                            .registration_certificate(certiFile)
                            .about(requestCompany.getAbout())
                            .linkGoogleMap(requestCompany.getLinkGoogleMap())
                            .user(userRepository.getReferenceById(requestCompany.getEmployer_id()))
                            .logo(logoFile)
                            .banner(bannerFile)
                            .build();
                    companyRepository.save(company);
                    return MessageResponse.builder()
                            .message("Request Successfully")
                            .type(HttpStatus.OK)
                            .build();
                }

            }
//        }catch (Exception e){
//            throw new NotFoundException("Error creating company", HttpStatus.BAD_REQUEST);
//        }
    }

    @Override
    public MessageResponse updateCompany(String id, RequestCompany requestCompany) {
        try{
            if(companyRepository.existsByUser(userRepository.getReferenceById(requestCompany.getEmployer_id()))){
                throw new NotFoundException("Company already exists", HttpStatus.BAD_REQUEST);
            }else{

                String certiFile = fileService.savaFileStatic(requestCompany.getRegistration_certificate(), "certificate-url");
                String logoFile = fileService.savaFileStatic(requestCompany.getLogo(), "logo-url");
                String bannerFile = fileService.savaFileStatic(requestCompany.getBanner(), "banner-url");
                if(certiFile.isEmpty() || logoFile.isEmpty() || bannerFile.isEmpty()){
                    return MessageResponse.builder()
                            .message("Error Upload File Please Try Again")
                            .type(HttpStatus.BAD_REQUEST)
                            .build();
                }else{

                    Company company = Company.builder()
                            .name(requestCompany.getName())
                            .taxCode(requestCompany.getTaxCode())
                            .field(requestCompany.getField())
                            .address(requestCompany.getAddress())
                            .province(requestCompany.getProvince())
                            .registration_certificate(certiFile)
                            .about(requestCompany.getAbout())
                            .linkGoogleMap(requestCompany.getLinkGoogleMap())
                            .logo(logoFile)
                            .banner(bannerFile)
                            .build();
                    companyRepository.save(company);
                    return MessageResponse.builder()
                            .message("Request Successfully")
                            .type(HttpStatus.OK)
                            .build();
                }

            }

        }catch (Exception e){
            throw new NotFoundException("Error creating company", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseCompany deleteCompany(String id) {
        try{
            if(companyRepository.findById(id).isEmpty()){
                throw new NotFoundException("Company not found", HttpStatus.NOT_FOUND);
            }else{
                Timestamp dateNow = Timestamp.from(Instant.now());
                Company company = companyRepository.findById(id).get();
                company.setDeletedAt(dateNow);
                companyRepository.save(company);
                return companyRepository.getCompanyById(company.getId());
            }

        }catch (Exception e){
            throw new NotFoundException("Error creating company", HttpStatus.BAD_REQUEST);
        }
    }
}