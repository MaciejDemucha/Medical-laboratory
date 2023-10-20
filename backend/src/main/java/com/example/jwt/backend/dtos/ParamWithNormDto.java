package com.example.jwt.backend.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class ParamWithNormDto {
    private Long id;
    @NotNull
    private String name;
    @NotNull
    private Float value;

    private Long normId;
    @NotNull
    private String unit;
    @NotNull
    private Float min;
    @NotNull
    private Float max;
}
