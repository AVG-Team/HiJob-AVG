package avg.hijob.backend.responses;


import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseJobTypeDetail {
    private Long id;
    private String name;
}
