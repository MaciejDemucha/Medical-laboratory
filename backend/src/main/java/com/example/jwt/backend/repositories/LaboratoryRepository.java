package com.example.jwt.backend.repositories;

import com.example.jwt.backend.entites.Laboratory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LaboratoryRepository extends JpaRepository<Laboratory, Long> {
}
