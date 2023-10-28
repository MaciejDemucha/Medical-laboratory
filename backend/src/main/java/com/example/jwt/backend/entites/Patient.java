package com.example.jwt.backend.entites;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "patient")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "pesel", nullable = false)
    @Size(max = 100)
    private String pesel;

    @Column(name = "first_name", nullable = false)
    @Size(max = 100)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    @Size(max = 100)
    private String lastName;

    @Column(name = "birth_date", nullable = false)
    //@Size(max = 100)
    private Date birthDate; //TODO poprawic

    @ManyToOne
    @JoinColumn(name="doctor_id")
    private User doctor;

    //@OneToOne(cascade = CascadeType.ALL)
    //@JoinColumn(name = "address_id", referencedColumnName = "id")
    @ManyToOne
    @JoinColumn(name="address_id", nullable = false)
    private Address address;

    @ManyToOne
    @JoinColumn(name="gender_id", nullable = false)
    private Gender gender;

    @OneToMany(mappedBy="patient")
    private Set<Examination> examinations;

    //TODO: login password
}
