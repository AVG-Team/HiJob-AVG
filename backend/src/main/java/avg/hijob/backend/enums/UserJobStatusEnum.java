package avg.hijob.backend.enums;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum UserJobStatusEnum {
    OFF(false),
    ON(true);
    public final Boolean value;
}
