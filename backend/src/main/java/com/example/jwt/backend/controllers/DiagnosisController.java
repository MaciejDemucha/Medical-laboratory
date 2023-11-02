package com.example.jwt.backend.controllers;

import com.example.jwt.backend.dtos.DiagnosisDto;
import com.example.jwt.backend.dtos.ExaminationDto;
import com.example.jwt.backend.services.DiagnosisService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class DiagnosisController {

    private final DiagnosisService diagnosisService;

    @GetMapping("/diagnosis")
    public ResponseEntity<List<DiagnosisDto>> getAllDiagnosis(){
        return ResponseEntity.ok(diagnosisService.allDiagnosis());
    }

    @GetMapping("/diagnosis/{id}")
    public ResponseEntity<DiagnosisDto> getDiagnosisByExaminationId(@PathVariable Long id){
        return ResponseEntity.ok(diagnosisService.getDiagnosisByExaminationId(id));
    }

    @PostMapping("/diagnosis")
    public ResponseEntity<DiagnosisDto> createDiagnosis(@Valid @RequestBody DiagnosisDto diagnosisDto){
        DiagnosisDto createdDiagnosis = diagnosisService.createDiagnosis(diagnosisDto);
        return ResponseEntity.created(URI.create("/diagnosis/" + createdDiagnosis.getId())).body(createdDiagnosis);
    }

    @DeleteMapping("/diagnosis/{id}")
    public ResponseEntity<DiagnosisDto> deleteDiagnosis(@PathVariable Long id){
        return ResponseEntity.ok(diagnosisService.deleteDiagnosis(id));
    }

    @PutMapping("/diagnosis/{id}")
    public ResponseEntity<DiagnosisDto> updateDiagnosis(@PathVariable Long id, @Valid @RequestBody DiagnosisDto diagnosisDto){
        return ResponseEntity.ok(diagnosisService.updateDiagnosis(id, diagnosisDto));
    }
}
