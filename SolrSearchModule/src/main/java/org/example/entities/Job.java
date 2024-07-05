//package org.example.entities;
//
//import jakarta.persistence.*;
//import lombok.*;
//import org.springframework.data.annotation.Id;
//import org.springframework.data.elasticsearch.annotations.Document;
//import org.springframework.data.elasticsearch.annotations.Field;
//import org.springframework.data.elasticsearch.annotations.FieldType;
//
//import java.sql.Timestamp;
//import java.util.HashSet;
//import java.util.Set;
//
////@Getter
////@Setter
////@RequiredArgsConstructor
////@AllArgsConstructor
////@Document(indexName = "job")
////@Data
////@Builder
//public class Job {
////    @Id
////    @Field(name = "id", type = FieldType.Text)
////    private String id;
////
////    @Field(name = "title", type = FieldType.Text)
////    private String title;
////
////    @Field(name = "description", type = FieldType.Text)
////    private String description;
////
////    @Field(name = "responsibilities", type = FieldType.Text)
////    private String responsibilities;
////
////    @Field(name = "requirements", type = FieldType.Text)
////    private String requirements;
////
////    @Field(name = "benefits", type = FieldType.Text)
////    private String benefits;
////
////    @Field(name = "requireOfYear", type = FieldType.Text)
////    private String requireOfYear;
////
////    @Field(name = "salary", type = FieldType.Long)
////    private Long salary;
////
////    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL, orphanRemoval = false)
////    private Set<JobLevelDetail> levels = new HashSet<>();
////
////    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL, orphanRemoval = false)
////    private Set<JobTypeDetail> jobTypes = new HashSet<>();
////
////    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL, orphanRemoval = false)
////    private Set<ContractTypeDetail> contractTypes = new HashSet<>();
////
////    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL, orphanRemoval = false)
////    private Set<JobSkillDetail> skills = new HashSet<>();
////
////    @ManyToOne(targetEntity = Company.class, fetch = FetchType.EAGER)
////    @JoinColumn(nullable = false, name = "company_id")
////    private Company company;
////
////    @ManyToOne(targetEntity = User.class, fetch = FetchType.EAGER)
////    @JoinColumn(nullable = false, name = "user_id")
////    private User user;
////
////    @Column(nullable = false)
////    @Temporal(TemporalType.TIMESTAMP)
////    private Timestamp createdAt;
////
////    @Column(nullable = false)
////    @Temporal(TemporalType.TIMESTAMP)
////    private Timestamp updatedAt;
////
////    @Temporal(TemporalType.TIMESTAMP)
////    private Timestamp deletedAt;
////
////    @PrePersist
////    protected void onCreate() {
////        createdAt = new Timestamp(System.currentTimeMillis());
////        updatedAt = new Timestamp(System.currentTimeMillis());
////    }
////
////    @PreUpdate
////    protected void onUpdate() {
////        updatedAt = new Timestamp(System.currentTimeMillis());
////    }
////
////    @PreRemove
////    protected void onDelete() {
////        deletedAt = new Timestamp(System.currentTimeMillis());
////    }
//
//}
//