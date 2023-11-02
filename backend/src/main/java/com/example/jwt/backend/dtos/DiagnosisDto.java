package com.example.jwt.backend.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class DiagnosisDto {

    private Long id;
    @NotNull
    private String description;
    private Long examinationId;

}
