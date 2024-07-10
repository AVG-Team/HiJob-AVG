package avg.hijob.backend.services.impl;

import avg.hijob.backend.entities.Company;
import avg.hijob.backend.exceptions.NotFoundException;
import avg.hijob.backend.repositories.*;
import avg.hijob.backend.responses.dashboard.ResponseDataCard;
import avg.hijob.backend.responses.dashboard.ResponseTop5Company;
import avg.hijob.backend.services.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardServiceImpl implements DashboardService {
    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private LevelRepository levelRepository;

    @Override
    public List<ResponseTop5Company> getTop5CompaniesFollow() {
        Pageable topFive = PageRequest.of(0,5);
        if(companyRepository.findAll().isEmpty()){
            throw new NotFoundException("No companies found", HttpStatus.NOT_FOUND);
        }
        return companyRepository.getTop5CompanyFollow(topFive);
    }

    public Map<String, List<Long>> getUserCountsByRoleAndType(Optional<String> type) {
        String typeValue = type.orElse("month");
        LocalDate now = LocalDate.now();
        Timestamp startDate;
        Timestamp endDate = Timestamp.valueOf(now.atStartOfDay().plusDays(1)); // To include the end date

        switch (typeValue.toLowerCase()) {
            case "day":
                startDate = Timestamp.valueOf(now.minusDays(7).atStartOfDay());
                return getCountsByDay(startDate, endDate);
            case "week":
                startDate = Timestamp.valueOf(now.minusWeeks(4).with(TemporalAdjusters.previousOrSame(java.time.DayOfWeek.MONDAY)).atStartOfDay());
                return getCountsByWeek(startDate, endDate);
            case "month":
                startDate = Timestamp.valueOf(now.with(TemporalAdjusters.firstDayOfYear()).atStartOfDay());
                return getCountsByMonth(startDate, endDate);
            default:
                throw new IllegalArgumentException("Invalid type: " + type);
        }
    }

    private Map<String, List<Long>> getCountsByDay(Timestamp startDate, Timestamp endDate) {
        List<Object[]> results = userRepository.countUsersByRoleAndDateRange(startDate, endDate);
        Map<String, List<Long>> userCounts = initializeCountMap(startDate.toLocalDateTime(), endDate.toLocalDateTime(), ChronoUnit.DAYS);

        for (Object[] result : results) {
            Integer role = (Integer) result[0];
            LocalDateTime createdAt = ((Timestamp) result[1]).toLocalDateTime();
            Long count = (Long) result[2];

            int dayIndex = (int) ChronoUnit.DAYS.between(startDate.toLocalDateTime(), createdAt);
            if (dayIndex >= 0 && dayIndex < userCounts.get("role1").size()) {
                if (role == 1) {
                    userCounts.get("role1").set(dayIndex, userCounts.get("role1").get(dayIndex) + count);
                } else if (role == 2) {
                    userCounts.get("role2").set(dayIndex, userCounts.get("role2").get(dayIndex) + count);
                }
            }
        }

        return userCounts;
    }

    private Map<String, List<Long>> getCountsByWeek(Timestamp startDate, Timestamp endDate) {
        List<Object[]> results = userRepository.countUsersByRoleAndDateRange(startDate, endDate);
        Map<String, List<Long>> userCounts = initializeCountMap(startDate.toLocalDateTime(), endDate.toLocalDateTime(), ChronoUnit.WEEKS);

        for (Object[] result : results) {
            Integer role = (Integer) result[0];
            LocalDateTime createdAt = ((Timestamp) result[1]).toLocalDateTime();
            Long count = (Long) result[2];

            int weekIndex = (int) ChronoUnit.WEEKS.between(startDate.toLocalDateTime(), createdAt);
            if (weekIndex >= 0 && weekIndex < userCounts.get("role1").size()) {
                if (role == 1) {
                    userCounts.get("role1").set(weekIndex, userCounts.get("role1").get(weekIndex) + count);
                } else if (role == 2) {
                    userCounts.get("role2").set(weekIndex, userCounts.get("role2").get(weekIndex) + count);
                }
            }
        }

        return userCounts;
    }

    private Map<String, List<Long>> getCountsByMonth(Timestamp startDate, Timestamp endDate) {
        List<Object[]> results = userRepository.countUsersByRoleAndDateRange(startDate, endDate);
        Map<String, List<Long>> userCounts = initializeCountMap(startDate.toLocalDateTime(), endDate.toLocalDateTime(), ChronoUnit.MONTHS);

        for (Object[] result : results) {
            Integer role = (Integer) result[0];
            LocalDateTime createdAt = ((Timestamp) result[1]).toLocalDateTime();
            Long count = (Long) result[2];

            int monthIndex = (int) ChronoUnit.MONTHS.between(startDate.toLocalDateTime(), createdAt);
            if (monthIndex >= 0 && monthIndex < userCounts.get("role1").size()) {
                if (role == 1) {
                    userCounts.get("role1").set(monthIndex, userCounts.get("role1").get(monthIndex) + count);
                } else if (role == 2) {
                    userCounts.get("role2").set(monthIndex, userCounts.get("role2").get(monthIndex) + count);
                }
            }
        }

        return userCounts;
    }


    private Map<String, List<Long>> initializeCountMap(LocalDateTime startDate, LocalDateTime endDate, ChronoUnit unit) {
        Map<String, List<Long>> userCounts = new HashMap<>();
        userCounts.put("role1", new ArrayList<>());
        userCounts.put("role2", new ArrayList<>());

        long totalUnits = unit.between(startDate, endDate);
        for (int i = 0; i < totalUnits; i++) {
            userCounts.get("role1").add(0L);
            userCounts.get("role2").add(0L);
        }

        return userCounts;
    }

    private static final DecimalFormat df = new DecimalFormat("#.##");

    @Override
    public ResponseDataCard getDataCard() {
        int totalCompany = companyRepository.findAll().stream()
                .filter(company -> company.getDeletedAt() == null)
                .toList().size();

        int totalJob = jobRepository.findAll().stream()
                .filter(job -> job.getDeletedAt() == null)
                .toList().size();

        int totalUser = userRepository.findAll().stream()
                .filter(user -> user.getDeletedAt() == null && user.getRole().getName().equals("USER"))
                .toList().size();

        int totalEmployer = userRepository.findAll().stream()
                .filter(user -> user.getDeletedAt() == null && user.getRole().getName().equals("EMPLOYEE"))
                .toList().size();

        return new ResponseDataCard(totalCompany, totalJob, totalUser, totalEmployer);
    }

    @Override
    public Map<String, Double> getSkillPercentages() {
        List<Object[]> skillCounts = skillRepository.countSkillsWithJobSkillDetail();

        // Tính tổng số lượng bản ghi (totalCount)
        long totalCount = skillCounts.stream()
                .mapToLong(arr -> (long) arr[1])
                .sum();

        // Tạo Map để lưu trữ kết quả (tên kỹ năng và phần trăm)
        Map<String, Double> finalSkillPercentages = new HashMap<>();
        skillCounts.forEach(arr -> {
            String name = (String) arr[0];
            long count = (long) arr[1];
            double percentage = (count / (double) totalCount) * 100;
            finalSkillPercentages.put(name, Double.valueOf(df.format(percentage)));
        });

        // Sắp xếp Map theo giá trị phần trăm giảm dần
        Map<String, Double> sortedSkillPercentages = finalSkillPercentages.entrySet().stream()
                .sorted((e1, e2) -> Double.compare(e2.getValue(), e1.getValue()))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (oldValue, newValue) -> oldValue, LinkedHashMap::new));

        // Giới hạn chỉ lấy 4 kỹ năng cao nhất và tính tổng phần trăm của kỹ năng "Other"
        Map<String, Double> topSkills = sortedSkillPercentages.entrySet().stream()
                .limit(4)
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (oldValue, newValue) -> oldValue, LinkedHashMap::new));

        double otherPercentage = sortedSkillPercentages.entrySet().stream()
                .skip(4)
                .mapToDouble(Map.Entry::getValue)
                .sum();

        topSkills.put("Other", Double.valueOf(df.format(otherPercentage)));

        return topSkills;
    }

    @Override
    public Map<String, Double> getLevelPercentages() {
        List<Object[]> levelCounts = levelRepository.countLevelsWithJobLevelDetail();

        // Tính tổng số lượng bản ghi (totalCount)
        long totalCount = levelCounts.stream()
                .mapToLong(arr -> (long) arr[1])
                .sum();

        // Tạo Map để lưu trữ kết quả (tên kỹ năng và phần trăm)
        Map<String, Double> finalLevelPercentages = new HashMap<>();
        levelCounts.forEach(arr -> {
            String name = (String) arr[0];
            long count = (long) arr[1];
            double percentage = (count / (double) totalCount) * 100;
            finalLevelPercentages.put(name, Double.valueOf(df.format(percentage)));
        });

        // Sắp xếp Map theo giá trị phần trăm giảm dần
        Map<String, Double> sortedLevelPercentages = finalLevelPercentages.entrySet().stream()
                .sorted((e1, e2) -> Double.compare(e2.getValue(), e1.getValue()))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (oldValue, newValue) -> oldValue, LinkedHashMap::new));

        // Giới hạn chỉ lấy 4 kỹ năng cao nhất và tính tổng phần trăm của kỹ năng "Other"
        Map<String, Double> topLevel = sortedLevelPercentages.entrySet().stream()
                .limit(4)
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (oldValue, newValue) -> oldValue, LinkedHashMap::new));

        double otherPercentage = sortedLevelPercentages.entrySet().stream()
                .skip(4)
                .mapToDouble(Map.Entry::getValue)
                .sum();

        topLevel.put("Other", Double.valueOf(df.format(otherPercentage)));

        return topLevel;
    }
}
