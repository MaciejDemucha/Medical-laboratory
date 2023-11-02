package com.example.jwt.backend.repositories;

import com.example.jwt.backend.entites.Diagnosis;
import com.example.jwt.backend.entites.Examination;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DiagnosisRepository extends JpaRepository<Diagnosis, Long> {

    Optional<Diagnosis> findByExamination_Id(Long id);
}
