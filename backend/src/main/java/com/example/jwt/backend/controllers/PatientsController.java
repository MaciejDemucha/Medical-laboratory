package com.example.jwt.backend.controllers;

import com.example.jwt.backend.dtos.ExaminationDto;
import com.example.jwt.backend.dtos.PatientDto;
import com.example.jwt.backend.services.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class PatientsController {
    private final PatientService patientService;

    @GetMapping("/patients")
    public ResponseEntity<List<PatientDto>> allPatients(){
        return ResponseEntity.ok(patientService.allPatients());
    }
}
