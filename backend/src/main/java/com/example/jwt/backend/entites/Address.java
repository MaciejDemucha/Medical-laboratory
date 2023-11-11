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
@Table(name = "address")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "street", nullable = false)
    @Size(max = 100)
    private String street;

    @Column(name = "postal_code", nullable = false)
    @Size(max = 100)
    private String postalCode;

    @Column(name = "city", nullable = false)
    @Size(max = 100)
    private String city;

    @OneToMany(mappedBy="address")
    private Set<Patient> patients;

    @OneToMany(mappedBy="address")
    private Set<Laboratory> laboratories;
}
