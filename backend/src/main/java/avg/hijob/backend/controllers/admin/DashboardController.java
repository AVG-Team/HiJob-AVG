package avg.hijob.backend.controllers.admin;

import avg.hijob.backend.responses.ResponseHandler;
import avg.hijob.backend.services.CompanyService;
import avg.hijob.backend.services.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
public class DashboardController {
    @Autowired
    private final DashboardService dashboardService;

    @GetMapping("/getTop5CompaniesFollow")
    public ResponseEntity<Object> getTop5CompaniesFollow() {
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, dashboardService.getTop5CompaniesFollow());
    }

    @GetMapping("/getDataCard")
    public ResponseEntity<Object> getDataCard() {
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, dashboardService.getDataCard());
    }

    @GetMapping("/getUserCountsByRoleAndType")
    public ResponseEntity<Object> getUserCountsByRoleAndType(Optional<String> type) {
        System.out.println(type);
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, dashboardService.getUserCountsByRoleAndType(type));
    }

    @GetMapping("/getSkillPercent")
    public ResponseEntity<Object> getSkillPercent() {
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, dashboardService.getSkillPercentages());
    }

    @GetMapping("/getLevelPercent")
    public ResponseEntity<Object> getLevelPercent() {
        return ResponseHandler.responseBuilder("Complete", HttpStatus.OK, dashboardService.getLevelPercentages());
    }
}
