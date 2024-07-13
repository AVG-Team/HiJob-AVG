package avg.hijob.backend.services.impl;

import avg.hijob.backend.entities.Company;
import avg.hijob.backend.entities.Recruitment;
import avg.hijob.backend.entities.User;
import avg.hijob.backend.exceptions.NotFoundException;
import avg.hijob.backend.repositories.JobRepository;
import avg.hijob.backend.repositories.RecruitmentRepository;
import avg.hijob.backend.repositories.UserRepository;
import avg.hijob.backend.requests.RequestCompany;
import avg.hijob.backend.requests.RequestRecruitment;
import avg.hijob.backend.responses.FileUploadResponse;
import avg.hijob.backend.responses.ResponseCompany;
import avg.hijob.backend.responses.ResponseRecruitment;
import avg.hijob.backend.services.FileService;
import avg.hijob.backend.services.RecruitmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class RecruitmentServiceImpl implements RecruitmentService {

    @Autowired
    private RecruitmentRepository recruitmentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private FileService fileService;

    @Override
    public Page<ResponseRecruitment> getAllRecruitments(Optional<Integer> pageSize, Optional<Integer> pageNo, Optional<String> q) {
        Pageable pageable = PageRequest.of(pageNo.orElse(0), pageSize.orElse(12));
        if(recruitmentRepository.findAll().isEmpty()) {
            throw new NotFoundException("No recruitments found", HttpStatus.NOT_FOUND);
        }
        return recruitmentRepository.getAllRecruitmentsQuery(q.orElse(null), pageable);
    }

    @Override
    public List<ResponseRecruitment> getRecruitmentByUserId(String userId) {
        if(userRepository.findById(userId).isEmpty()) {
            throw new NotFoundException("User not found", HttpStatus.NOT_FOUND);
        }
        return recruitmentRepository.getRecruitmentByUserId(userId);
    }

    @Override
    public ResponseRecruitment getRecruitmentById(String recruitmentId) {
        if(recruitmentRepository.findById(recruitmentId).isEmpty())
            throw new NotFoundException("Recruitment not found", HttpStatus.NOT_FOUND);
        return recruitmentRepository.getRecruitmentById(recruitmentId);
    }

    @Override
    public List<ResponseRecruitment> getRecruitmentByJobId(String jobId) {
        if(jobRepository.findById(jobId).isEmpty())
            throw new NotFoundException("Job not found", HttpStatus.NOT_FOUND);
        return recruitmentRepository.getRecruitmentByJobId(jobId);
    }

    @Override
    public ResponseRecruitment getRecruitmentByJobIdAndUserId(String jobId, String userId) {
        if(jobRepository.findById(jobId).isEmpty())
            throw new NotFoundException("Job not found", HttpStatus.NOT_FOUND);
        if(userRepository.findById(userId).isEmpty())
            throw new NotFoundException("User not found", HttpStatus.NOT_FOUND);
        return recruitmentRepository.getRecruitmentByJobIdAndUserId(jobId, userId);
    }

    @Override
    public ResponseRecruitment createRecruitment(RequestRecruitment requestRecruitment) {
//      try{
          System.out.println(requestRecruitment.toString());
          String cv = fileService.savaFileStatic(requestRecruitment.getCv(), "cv");
          String coverLetter = fileService.savaFileStatic(requestRecruitment.getCoverLetter(),"cover-letter");
          if(cv.isEmpty() || coverLetter.isEmpty()) {
              throw new NotFoundException("Upload Failed", HttpStatus.NOT_FOUND);
          }
          else{
              Recruitment recruitment = Recruitment.builder()
                      .user(userRepository.findById(requestRecruitment.getUserId()).get())
                      .job(jobRepository.findById(requestRecruitment.getJobId()).get())
                      .cv(cv)
                      .coverLetter(coverLetter)
                      .status(requestRecruitment.getStatus())
                      .build();
              recruitmentRepository.save(recruitment);

              return new ResponseRecruitment(recruitment.getId(), recruitment.getUser().getId(),
                      recruitment.getJob().getId(),recruitment.getStatus(), recruitment.getCv(),
                      recruitment.getCoverLetter(),  recruitment.getAppliedAt(), recruitment.getDeletedAt());
          }
//      }catch (Exception e) {
//          throw new NotFoundException("Error", HttpStatus.NOT_FOUND);
//      }
    }

    @Override
    public ResponseRecruitment updateRecruitment(String id, RequestRecruitment requestRecruitment) {
        try{
            if(recruitmentRepository.findById(id).isEmpty()){
                throw new NotFoundException("Recruitment not found", HttpStatus.NOT_FOUND);
            }else{
                Recruitment recruitment = recruitmentRepository.findById(id).get();
                recruitment.setStatus(requestRecruitment.getStatus());
                recruitment.setCv(requestRecruitment.getCv());
                recruitment.setCoverLetter(requestRecruitment.getCoverLetter());
                recruitmentRepository.save(recruitment);
                return recruitmentRepository.getRecruitmentById(recruitment.getId());
            }

        }catch (Exception e){
            throw new NotFoundException("Error creating recruitment", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseRecruitment deleteRecruitment(String id) {
        try{
            if(recruitmentRepository.findById(id).isEmpty()){
                throw new NotFoundException("Recruitment not found", HttpStatus.NOT_FOUND);
            }else{
                Timestamp dateNow = Timestamp.from(Instant.now());
                Recruitment recruitment = recruitmentRepository.findById(id).get();
                recruitment.setDeletedAt(dateNow);
                recruitmentRepository.save(recruitment);
                return recruitmentRepository.getRecruitmentById(recruitment.getId());
            }

        }catch (Exception e){
            throw new NotFoundException("Error deleting recruitment", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public FileUploadResponse updateAvatar(MultipartFile file) {
        if (file.isEmpty()) {
            return FileUploadResponse.builder().message("Please select a file!").type(HttpStatus.BAD_REQUEST).build();
        }
        return null;

//        User user = getUserCurrentService();
//        if(user == null) {
//            return FileUploadResponse.builder()
//                    .message("You are not authorized to upload file Avatar!")
//                    .type(HttpStatus.UNAUTHORIZED)
//                    .build();
//        }

//        String fileName = fileService.savaFileStatic(file, "avatar");
//        if (fileName != null) {
//            recruitmentRepository.setAvatar(fileName);
//            userRepository.save(user);
//            return FileUploadResponse.builder()
//                    .message("File uploaded successfully")
//                    .name(fileName)
//                    .type(HttpStatus.OK)
//                    .build();
//        } else {
//            return FileUploadResponse.builder()
//                    .message("Error Upload File Please Try Again")
//                    .type(HttpStatus.BAD_REQUEST)
//                    .build();
//        }
    }
}
