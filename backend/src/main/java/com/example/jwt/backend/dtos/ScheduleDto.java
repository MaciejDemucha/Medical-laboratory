package com.example.jwt.backend.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class ScheduleDto {
    private Long id;
    @NotNull
    private String day;
    @NotNull
    private String openingTime;
    @NotNull
    private String closingTime;
}
