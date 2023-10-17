package com.example.jwt.backend.repositories;

import com.example.jwt.backend.entites.Examination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExaminationRepository extends JpaRepository<Examination, Long> {

    List<Examination> findByPatientId(Long patientId);
}
