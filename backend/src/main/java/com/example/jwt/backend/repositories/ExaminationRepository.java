package com.example.jwt.backend.repositories;

import com.example.jwt.backend.entites.Examination;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExaminationRepository extends JpaRepository<Examination, Long> {

}
