package com.example.jwt.backend.repositories;

import com.example.jwt.backend.entites.Examination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

public interface ExaminationRepository extends JpaRepository<Examination, Long> {


    List<Examination> findByPatientId(Long patientId, Sort sort);
    //Optional<Examination> findByNumber(String number);
}
