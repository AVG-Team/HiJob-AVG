package avg.hijob.backend.services;

import avg.hijob.backend.requests.RequestCompany;
import avg.hijob.backend.requests.RequestRecruitment;
import avg.hijob.backend.responses.FileUploadResponse;
import avg.hijob.backend.responses.ResponseCompany;
import avg.hijob.backend.responses.ResponseRecruitment;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface RecruitmentService{
    public Page<ResponseRecruitment> getAllRecruitments(Optional<Integer> pageSize, Optional<Integer> pageNo, Optional<String> q);
    public List<ResponseRecruitment> getRecruitmentByUserId(String userId);
    public ResponseRecruitment getRecruitmentById(String recruitmentId);
    public List<ResponseRecruitment> getRecruitmentByJobId(String jobId);
    public ResponseRecruitment getRecruitmentByJobIdAndUserId(String jobId, String userId);
    public ResponseRecruitment createRecruitment(RequestRecruitment requestRecruitment);
    public ResponseRecruitment updateRecruitment(String id, RequestRecruitment requestRecruitment);
    public ResponseRecruitment deleteRecruitment(String id);
    public FileUploadResponse updateAvatar(MultipartFile file);
}
