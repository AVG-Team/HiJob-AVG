package avg.hijob.backend.responses;

import avg.hijob.backend.enums.AuthenticationResponseEnum;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MessageResponse {
    @JsonProperty("type")
    private HttpStatus type;
    @JsonProperty("message")
    private String message;
}
