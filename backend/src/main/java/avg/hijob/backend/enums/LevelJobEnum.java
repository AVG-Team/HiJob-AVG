package avg.hijob.backend.enums;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum LevelJobEnum {
    INTERN(1),
    FRESHER(2),
    JUNIOR(3),
    MID(4),
    SENIOR(5),
    LEAD(6),
    PRINCIPAL(7),
    MANAGER(8),
    DIRECTOR(9),
    OTHER(10);

    public final int value;
}
