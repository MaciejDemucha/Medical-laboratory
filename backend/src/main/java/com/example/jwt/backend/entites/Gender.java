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
@Table(name = "gender")
public class Gender {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    @Size(max = 100)
    private String name;

    @OneToMany(mappedBy="gender")
    private Set<Patient> patients;

    @OneToMany(mappedBy="gender")
    private Set<NormRange> normRanges;
}
