package com.example.jwt.backend.repositories;

import com.example.jwt.backend.entites.Examination;
import com.example.jwt.backend.entites.Gender;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenderRepository extends JpaRepository<Gender, Long> {
}
