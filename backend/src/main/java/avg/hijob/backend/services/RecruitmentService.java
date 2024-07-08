package avg.hijob.backend.services;

import avg.hijob.backend.requests.RequestRecruitment;
import avg.hijob.backend.responses.FileUploadResponse;
import avg.hijob.backend.responses.ResponseRecruitment;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface RecruitmentService{
    public List<ResponseRecruitment> getRecruitmentByUserId(String userId);
    public ResponseRecruitment getRecruitmentById(String recruitmentId);
    public List<ResponseRecruitment> getRecruitmentByJobId(String jobId);
    public ResponseRecruitment getRecruitmentByJobIdAndUserId(String jobId, String userId);
    public ResponseRecruitment createRecruitment(RequestRecruitment recruitment);
    public ResponseRecruitment deleteRecruitment(String recruitmentId);
    public FileUploadResponse updateAvatar(MultipartFile file);
}
