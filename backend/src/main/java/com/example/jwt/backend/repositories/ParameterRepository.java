package com.example.jwt.backend.repositories;

import com.example.jwt.backend.entites.Examination;
import com.example.jwt.backend.entites.Parameter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParameterRepository extends JpaRepository<Parameter, Long> {
    List<Parameter> findByExamination_Id(Long id);

}
