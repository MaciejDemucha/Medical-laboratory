package com.example.jwt.backend.entites;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table
@Getter
@Setter
public class Examination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String name;
    @Column
    private LocalDate datePerformed;
    @Column(unique = true)
    private String password;

    @ManyToOne
    @JoinColumn(name="patient_id", nullable = false)
    private Patient patient;

    @OneToOne(mappedBy = "examination")
    private Diagnosis diagnosis;

    @OneToMany(mappedBy="examination")
    private Set<Parameter> parameters;

}
