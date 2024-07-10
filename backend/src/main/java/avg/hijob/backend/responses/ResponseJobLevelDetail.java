package avg.hijob.backend.responses;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseJobLevelDetail {
    private Long id;
    private String name;
}