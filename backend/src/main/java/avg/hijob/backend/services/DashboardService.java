package avg.hijob.backend.services;

import avg.hijob.backend.responses.dashboard.ResponseDataCard;
import avg.hijob.backend.responses.dashboard.ResponseTop5Company;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface DashboardService {
    List<ResponseTop5Company> getTop5CompaniesFollow();
    ResponseDataCard getDataCard();
    Map<String, List<Long>> getUserCountsByRoleAndType(Optional<String> type);
    Map<String, Double> getSkillPercentages();
    Map<String, Double> getLevelPercentages();
}
