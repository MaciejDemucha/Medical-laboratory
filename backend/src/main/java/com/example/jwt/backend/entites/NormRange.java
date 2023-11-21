package com.example.jwt.backend.entites;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Getter
@Setter
@Table(name = "norm_range")
public class NormRange {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "unit", nullable = false)
    private String unit;

    @Column(name = "min", nullable = false)
    private Float min;

    @Column(name = "max", nullable = false)
    private Float max;

    @ManyToOne
    @JoinColumn(name="gender_id")
    private Gender gender;

    @OneToMany(mappedBy="normRange")
    private Set<Parameter> parameters;
}
