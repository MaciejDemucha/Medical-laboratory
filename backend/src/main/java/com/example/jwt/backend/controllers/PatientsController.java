package com.example.jwt.backend.controllers;

import com.example.jwt.backend.dtos.ExaminationDto;
import com.example.jwt.backend.dtos.PatientDto;
import com.example.jwt.backend.services.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/patients/{id}")
    public ResponseEntity<PatientDto> getPatientById(@PathVariable Long id){
        return ResponseEntity.ok(patientService.getPatientById(id));
    }
    @GetMapping("/patients/bypesel/{pesel}")
    public ResponseEntity<PatientDto> getPatientByPesel(@PathVariable String pesel){
        return ResponseEntity.ok(patientService.getPatientByPesel(pesel));
    }
}
