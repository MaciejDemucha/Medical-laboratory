package com.example.jwt.backend.repositories;

import com.example.jwt.backend.entites.Examination;
import com.example.jwt.backend.entites.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByPesel(String pesel);
    boolean existsByPesel(String pesel);
}
