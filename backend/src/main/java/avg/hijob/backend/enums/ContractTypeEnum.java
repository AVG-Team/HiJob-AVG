package avg.hijob.backend.enums;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum ContractTypeEnum {
    FULL_TIME(1),
    PART_TIME(2),
    FREELANCE(3);
    public final int value;
}
