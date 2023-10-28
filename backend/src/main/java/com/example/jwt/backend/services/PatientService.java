package com.example.jwt.backend.services;

import com.example.jwt.backend.dtos.DoctorNameDto;
import com.example.jwt.backend.dtos.PatientDto;
import com.example.jwt.backend.entites.Patient;
import com.example.jwt.backend.entites.User;
import com.example.jwt.backend.exceptions.AppException;
import com.example.jwt.backend.mappers.PatientMapper;
import com.example.jwt.backend.repositories.PatientRepository;
import com.example.jwt.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class PatientService {
    private final PatientMapper patientMapper;
    private final PatientRepository patientRepository;
    private final UserRepository userRepository;

    //TODO: register

    public List<PatientDto> allPatients(){
        return patientMapper.toPatientDtos(patientRepository.findAll());
    }

    public PatientDto getPatientById(Long id){
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new AppException("Patient not found", HttpStatus.NOT_FOUND));;
        return patientMapper.toPatientDto(patient);
    }

    public PatientDto getPatientByPesel(String pesel){
        Patient patient = patientRepository.findByPesel(pesel)
                .orElseThrow(() -> new AppException("Patient not found", HttpStatus.NOT_FOUND));
        return patientMapper.toPatientDto(patient);
    }

    public boolean isPatientByPesel(String pesel){

        if(patientRepository.existsByPesel(pesel)){
            return true;
        }
        else{
            throw new AppException("Unknown user", HttpStatus.NOT_FOUND);
        }
    }

    public List<PatientDto> getPatientsByDoctorId(Long id){
        List<Patient> patients = patientRepository.findByDoctor_Id(id);
        return patientMapper.toPatientDtos(patients);
    }

    public PatientDto assignDoctor(Long patientId, Long doctorId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new AppException("Patient not found", HttpStatus.NOT_FOUND));
        User doctor = userRepository.findById(doctorId)
                .orElseThrow(() -> new AppException("Doctor not found", HttpStatus.NOT_FOUND));

        if (patient != null && doctor != null) {
            patient.setDoctor(doctor);
           patientRepository.save(patient);
           return patientMapper.toPatientDto(patient);
        }

        throw new AppException("Unknown doctor or patient", HttpStatus.NOT_FOUND); // Handle cases where either the patient or doctor is not found
    }

    public DoctorNameDto getPatientsDoctor(Long patientId){
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new AppException("Patient not found", HttpStatus.NOT_FOUND));

        User doctor = patient.getDoctor();
        if(doctor != null){
            return new DoctorNameDto(doctor.getId(), doctor.getFirstName(), doctor.getLastName());
        }

        throw new AppException("Unknown doctor or patient", HttpStatus.NOT_FOUND);
    }
}
