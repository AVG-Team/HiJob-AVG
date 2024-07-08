package avg.hijob.backend.responses;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseContractType {
    private int id;
    private String typeName;
}