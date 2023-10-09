package com.example.jwt.backend.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class ExaminationDto {
    @NotNull
    private Long id;
    @NotNull
    private String name;
    @NotNull
    private Float price;
}
