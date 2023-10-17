package com.example.jwt.backend.entites;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.Collection;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Getter
@Setter
@Table(name = "parameter")
public class Parameter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    @Size(max = 100)
    private String name;

    @Column(name = "value", nullable = false)
    @Size(max = 100)
    private Float value;

    //@OneToOne(cascade = CascadeType.ALL)
    //@JoinColumn(name = "norm_range_id", referencedColumnName = "id")
    @OneToOne(mappedBy = "parameter")
    private NormRange normRange;

    @ManyToMany
    @JoinTable(name = "examination_parameter", joinColumns = @JoinColumn(name = "parameter_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "examination_id", referencedColumnName = "id"))
    private Collection<Examination> examinations;
}
