package com.example.jwt.backend.entites;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Collection;

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
    private String number;
    @Column
    private LocalDate datePerformed;

    @ManyToOne
    @JoinColumn(name="patient_id", nullable = false)
    private Patient patient;

    @OneToOne(mappedBy = "examination")
    private Diagnosis diagnosis;

    //@ManyToMany
    //@JoinTable(name = "examination_parameter", joinColumns = @JoinColumn(name = "examination_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "parameter_id", referencedColumnName = "id"))
    //private Collection<Parameter> parameters;
}
