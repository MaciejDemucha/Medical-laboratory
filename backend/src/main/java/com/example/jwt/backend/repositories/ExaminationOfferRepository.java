package com.example.jwt.backend.repositories;

import com.example.jwt.backend.entites.ExaminationOffer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExaminationOfferRepository extends JpaRepository<ExaminationOffer, Long> {
}
