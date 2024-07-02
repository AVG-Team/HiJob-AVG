package avg.hijob.backend.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetCurrentUserByAccessTokenResponse {
    private String fullName;
    private String role;
}
