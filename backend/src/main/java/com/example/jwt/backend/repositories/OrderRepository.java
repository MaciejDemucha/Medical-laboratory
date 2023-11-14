package com.example.jwt.backend.repositories;

import com.example.jwt.backend.entites.ExaminationOfferBucket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<ExaminationOfferBucket, Long> {
}
