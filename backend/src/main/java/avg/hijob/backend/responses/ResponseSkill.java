package avg.hijob.backend.responses;

import lombok.*;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseSkill {
    private int id;
    private String skillName;
}
