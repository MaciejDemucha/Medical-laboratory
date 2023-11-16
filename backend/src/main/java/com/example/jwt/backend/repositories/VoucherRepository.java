package com.example.jwt.backend.repositories;

import com.example.jwt.backend.entites.User;
import com.example.jwt.backend.entites.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoucherRepository extends JpaRepository<Voucher, Long> {
}
