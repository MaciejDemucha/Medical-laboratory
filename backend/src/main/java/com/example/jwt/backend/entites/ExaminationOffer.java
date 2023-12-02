package com.example.jwt.backend.entites;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table
@Getter
@Setter
public class ExaminationOffer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String name;
    @Column(length = 100000)
    private String description;

    @Column(name = "price", precision = 10, scale = 2) // precision is the total number of digits, scale is the number of decimal places
    private BigDecimal price;
}
