package com.example.jwt.backend.entites;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Getter
@Setter
@Table(name = "diagnosis")
public class Diagnosis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "description", nullable = false)
    @Size(max = 100)
    private String description;

    @OneToOne
    @JoinColumn(name="examination_id", nullable = false)
    private Examination examination;
}
