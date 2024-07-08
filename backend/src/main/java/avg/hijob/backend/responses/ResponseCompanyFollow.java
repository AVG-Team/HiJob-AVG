package avg.hijob.backend.responses;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseCompanyFollow {
    private Long id;
    private ResponseCompany company;
}
