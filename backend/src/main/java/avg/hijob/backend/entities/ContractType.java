package avg.hijob.backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class ContractType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;

    @OneToMany(mappedBy = "contractType", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ContractTypeDetail> jobs = new HashSet<>();
}
