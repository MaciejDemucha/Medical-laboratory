package com.example.jwt.backend.repositories;

import com.example.jwt.backend.entites.Laboratory;
import com.example.jwt.backend.entites.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findByLaboratory_Id(Long id);
}
