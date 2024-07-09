package org.example.enums;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum UserJobStatusEnum {
    OFF(false),
    ON(true);
    public final Boolean value;
}
