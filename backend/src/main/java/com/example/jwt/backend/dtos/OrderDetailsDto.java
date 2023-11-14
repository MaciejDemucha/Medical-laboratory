package com.example.jwt.backend.dtos;

import com.example.jwt.backend.entites.ExaminationOffer;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class OrderDetailsDto {

    private String email;
    private String firstName;
    private String lastName;
    private BigDecimal sumToPay;
    private List<ExaminationOffer> bucket;
}
