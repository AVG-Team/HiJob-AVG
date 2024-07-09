package org.example.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@AllArgsConstructor
@Getter
@Setter
@Data
public class ResponseJob {
    private String id;
    private String title;
    private String description;
    private String responsibilities;
    private String requirements;
    private String benefits;
    private String requireOfYear;
    private Long salary;
    private String companyId;
    private String userId;
    private Timestamp createdAt; // CamelCase for consistency
    private Timestamp updatedAt; // CamelCase for consistency
    private Timestamp deletedAt; // CamelCase for consistency

}
