package com.example.jwt.backend.dtos;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class NormRangeDto {

    private Long id;
    @NotNull
    private String unit;
    @NotNull
    private Float min;
    @NotNull
    private Float max;
}
