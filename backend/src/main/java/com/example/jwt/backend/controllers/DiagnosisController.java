package com.example.jwt.backend.controllers;

import com.example.jwt.backend.dtos.DiagnosisDto;
import com.example.jwt.backend.dtos.ExaminationDto;
import com.example.jwt.backend.dtos.PatientDto;
import com.example.jwt.backend.entites.Examination;
import com.example.jwt.backend.services.DiagnosisService;
import com.example.jwt.backend.services.EmailService;
import com.example.jwt.backend.services.ExaminationsService;
import com.example.jwt.backend.services.PatientService;
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
    private final ExaminationsService examinationsService;
    private final PatientService patientService;
    private final EmailService emailService;

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
        ExaminationDto examination = examinationsService.getExamination(diagnosisDto.getExaminationId());
        PatientDto patientDto = patientService.getPatientById(examination.getPatientId());
        String text = "Wystawiono diagnozę dla badania: \n" + examination.getName() + "\n\nData wykonania: " + examination.getDatePerformed() + "\n\nSzczegóły możesz zobaczyć w zakładce Wyniki badań na naszej stronie.";
        emailService.sendEmail(patientDto.getEmail(), "Laboratorium medyczne - diagnoza", text);
        return ResponseEntity.created(URI.create("/diagnosis/" + createdDiagnosis.getId())).body(createdDiagnosis);
    }

    @DeleteMapping("/diagnosis/{id}")
    public ResponseEntity<DiagnosisDto> deleteDiagnosis(@PathVariable Long id){
        return ResponseEntity.ok(diagnosisService.deleteDiagnosis(id));
    }

    @PutMapping("/diagnosis/{id}")
    public ResponseEntity<DiagnosisDto> updateDiagnosis(@PathVariable Long id, @Valid @RequestBody DiagnosisDto diagnosisDto){
        ExaminationDto examination = examinationsService.getExamination(diagnosisDto.getExaminationId());
        PatientDto patientDto = patientService.getPatientById(examination.getPatientId());
        String text = "Diagnosta edytował diagnozę dla badania: \n" + examination.getName() + "\n\nData wykonania: " + examination.getDatePerformed() + "\n\nSzczegóły możesz zobaczyć w zakładce Wyniki badań na naszej stronie.";
        emailService.sendEmail(patientDto.getEmail(), "Laboratorium medyczne - nowa diagnoza", text);
        return ResponseEntity.ok(diagnosisService.updateDiagnosis(id, diagnosisDto));
    }
}
