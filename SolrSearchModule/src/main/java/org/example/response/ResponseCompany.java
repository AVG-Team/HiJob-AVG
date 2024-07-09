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
public class ResponseCompany {
    private String id;
    private String name;
    private int taxCode;
    private String field;
    private String address;
    private String province;
    private String registration_certificate;
    private String about;
    private String linkGoogleMap;
    private String employer_id;
    private Timestamp createdAt; // CamelCase for consistency
    private Timestamp updatedAt; // CamelCase for consistency
    private Timestamp deletedAt; // CamelCase for consistency
}
