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
    @Size(max = 100)
    private String unit;

    @Column(name = "min", nullable = false)
    @Size(max = 100)
    private Float min;

    @Column(name = "max", nullable = false)
    @Size(max = 100)
    private Float max;

    @ManyToOne
    @JoinColumn(name="gender_id")
    private Gender gender;

    @OneToMany(mappedBy="normRange")
    private Set<Parameter> parameters;
}
