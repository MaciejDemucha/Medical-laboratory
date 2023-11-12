package com.example.jwt.backend.controllers;

import com.example.jwt.backend.dtos.PatientDto;
import com.example.jwt.backend.dtos.ScheduleDto;
import com.example.jwt.backend.services.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class ScheduleController {
    private final ScheduleService scheduleService;
    @GetMapping("/schedule/{id}")
    public ResponseEntity<List<ScheduleDto>> getScheduleByLaboratoryId(@PathVariable Long id){
        return ResponseEntity.ok(scheduleService.getSchedulesByLaboratoryId(id));
    }
}
