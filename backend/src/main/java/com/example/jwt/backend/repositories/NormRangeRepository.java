package com.example.jwt.backend.repositories;

import com.example.jwt.backend.entites.Examination;
import com.example.jwt.backend.entites.NormRange;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface NormRangeRepository extends JpaRepository<NormRange, Long> {

    Optional<NormRange> findByParameter_Id(Long parameterId);
}
