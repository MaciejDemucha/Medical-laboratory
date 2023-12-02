package com.example.jwt.backend.repositories;

import com.example.jwt.backend.entites.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByPesel(String pesel);
    boolean existsByPesel(String pesel);

    List<Patient> findByEmployee_Id(Long id);
}
