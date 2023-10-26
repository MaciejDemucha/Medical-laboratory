package com.example.jwt.backend.services;

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
                .orElseThrow(() -> new AppException("Patient not found", HttpStatus.NOT_FOUND));;
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
}
