package avg.hijob.backend.requests.user;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SearchUsersRequest {
    private String q;
    private String company;
    private String jobPosition;
    private String province;
    private String active;
    private String page;
    private String size;
    private String role;
    private String age;
//    private String deleted;

    public boolean isEmpty() {
        return (q == null || q.isEmpty()) &&
                (company == null || company.isEmpty()) &&
                (jobPosition == null || jobPosition.isEmpty()) &&
                (province == null || province.isEmpty()) &&
                (active == null || active.isEmpty()) &&
                (page == null || page.isEmpty()) &&
                (size == null || size.isEmpty()) &&
                (role == null || role.isEmpty()) &&
                (age == null || age.isEmpty());
//                (deleted == null || deleted.isEmpty());
    }
}
