package com.example.jwt.backend.controllers;

import com.example.jwt.backend.dtos.*;
import com.example.jwt.backend.services.AddressService;
import com.example.jwt.backend.services.PatientService;
import com.example.jwt.backend.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URI;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class PatientsController {
    private final PatientService patientService;
    private final UserService userService;
    private final AddressService addressService;

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

    @PostMapping("/patients")
    public ResponseEntity<PatientDto> addPatient(@RequestBody @Valid addPatientDto details) {
        PatientDto patientDto = new PatientDto(null, details.getPesel(), details.getFirstName(), details.getLastName(), details.getPhone(), details.getEmail(), details.getBirthDate());
        PatientDto createdPatient = patientService.createPatient(patientDto);
        AddressDto createdAddress = addressService.createAddress(new AddressDto(null, details.getStreet(), details.getPostalCode(), details.getCity()));
        patientService.assignAddress(createdPatient.getId(), createdAddress.getId());
        return ResponseEntity.created(URI.create("/patients/" + createdPatient.getId())).body(createdPatient);
    }

    @PutMapping("/assign-doctor/{doctorId}/{patientId}")
    public ResponseEntity<PatientDto> assignDoctorToPatient(@PathVariable Long patientId, @PathVariable Long doctorId) {
        return ResponseEntity.ok(patientService.assignEmployee(patientId, doctorId));
    }
}
