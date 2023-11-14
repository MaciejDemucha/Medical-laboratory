package com.example.jwt.backend.repositories;

import com.example.jwt.backend.entites.Bucket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BucketRepository extends JpaRepository<Bucket, Long> {
}
