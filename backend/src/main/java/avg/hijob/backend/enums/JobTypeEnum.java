package avg.hijob.backend.enums;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum JobTypeEnum {
    IN_OFFICE(1),
    HYBRID(2),
    REMOTE(3),
    OVERSEA(4);

    public final int value;
}
