package avg.hijob.backend.responses;

import avg.hijob.backend.entities.User;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
public class ResponseUsersPage {
    private List<ResponseUsers> users;
    private long totalResults;
    private int resultsPerPage;
    private int currentPage;
    private int totalPages;

    public ResponseUsersPage(List<ResponseUsers> users, long totalResults, int resultsPerPage, int currentPage, int totalPages) {
        this.users = users;
        this.totalResults = totalResults;
        this.resultsPerPage = resultsPerPage;
        this.currentPage = currentPage;
        this.totalPages = totalPages;
    }
}
