//package org.example.entities;
//
//
//import jakarta.validation.constraints.Email;
//import jakarta.validation.constraints.NotBlank;
//import jakarta.validation.constraints.Pattern;
//import jakarta.validation.constraints.Size;
//import lombok.*;
//import org.example.enums.UserJobStatusEnum;
//import org.springframework.data.annotation.Id;
//
//
//import java.sql.Timestamp;
//import java.util.HashSet;
//import java.util.Set;
//
//@Getter
//@Setter
//@RequiredArgsConstructor
//@AllArgsConstructor
//@Builder
//public class User {
//    @Id
//    private String id;
//
//    @NotBlank(message = "Email is required")
//    @Size(min = 1, max = 50, message = "Email must be between 1 and 50 characters")
//    @Email
//    private String email;
//
//    @NotBlank(message = "Password is required")
//    private String password;
//
//    @Pattern(regexp = "^[0-9]*$", message = "Phone must be number")
//    private String phone;
//
//    private String address;
//
//    private String province;
//
//    private String avatar;
//
//    private String fullName;
//
//    private String jobPosition;
//
//    private float yearExperience;
//
//    private String skills;
//
//    private boolean isActive = false;
//
//    private String socialNetwork1;
//
//    private String socialNetwork2;
//
//    private Boolean jobStatus = UserJobStatusEnum.OFF.value;
//
//}
//
