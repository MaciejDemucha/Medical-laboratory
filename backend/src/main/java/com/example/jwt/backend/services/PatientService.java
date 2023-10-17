package com.example.jwt.backend.services;

import com.example.jwt.backend.dtos.PatientDto;
import com.example.jwt.backend.entites.Patient;
import com.example.jwt.backend.exceptions.AppException;
import com.example.jwt.backend.mappers.PatientMapper;
import com.example.jwt.backend.repositories.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientService {
    private final PatientMapper patientMapper;
    private final PatientRepository patientRepository;

    //TODO: register

    public List<PatientDto> allPatients(){
        return patientMapper.toPatientDtos(patientRepository.findAll());
    }


}
