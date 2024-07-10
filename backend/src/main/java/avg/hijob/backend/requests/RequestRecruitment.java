package avg.hijob.backend.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@Data
public class RequestRecruitment {
    private String userId;
    private String jobId;
    private int status;
    private MultipartFile cv;
    private MultipartFile coverLetter;
}
