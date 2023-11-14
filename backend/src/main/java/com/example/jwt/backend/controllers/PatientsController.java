package com.example.jwt.backend.controllers;

import com.example.jwt.backend.dtos.PatientDto;
import com.example.jwt.backend.dtos.DoctorNameDto;
import com.example.jwt.backend.services.PatientService;
import com.example.jwt.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class PatientsController {
    private final PatientService patientService;
    private final UserService userService;

    @GetMapping("/patients")
    public ResponseEntity<List<PatientDto>> allPatients(){
        return ResponseEntity.ok(patientService.allPatients());
    }

    @GetMapping("/doctor/{doctorId}/patients")
    public ResponseEntity<List<PatientDto>> allPatientsByDoctorId(@PathVariable Long doctorId){
        return ResponseEntity.ok(patientService.getPatientsByDoctorId(doctorId));
    }

    @GetMapping("/patients/{id}")
    public ResponseEntity<PatientDto> getPatientById(@PathVariable Long id){
        return ResponseEntity.ok(patientService.getPatientById(id));
    }

    @GetMapping("/patients/doctor/{id}")
    public ResponseEntity<DoctorNameDto> getPatientsDoctor(@PathVariable Long id){
        return ResponseEntity.ok(patientService.getPatientsDoctor(id));
    }
    @GetMapping("/patients/bypesel/{pesel}")
    public ResponseEntity<PatientDto> getPatientByPesel(@PathVariable String pesel){
        return ResponseEntity.ok(patientService.getPatientByPesel(pesel));
    }

    @GetMapping("/doctors")
    public ResponseEntity<List<DoctorNameDto>> getDoctors(){
        return ResponseEntity.ok(userService.getAll());
    }

    @PutMapping("/assign-doctor/{doctorId}/{patientId}")
    public ResponseEntity<PatientDto> assignDoctorToPatient(@PathVariable Long patientId, @PathVariable Long doctorId) {
        return ResponseEntity.ok(patientService.assignEmployee(patientId, doctorId));
    }
}
