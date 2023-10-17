package com.example.jwt.backend.mappers;

import com.example.jwt.backend.dtos.ExaminationDto;
import com.example.jwt.backend.dtos.PatientDto;
import com.example.jwt.backend.entites.Examination;
import com.example.jwt.backend.entites.Patient;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PatientMapper {
    Patient toPatient(PatientDto patientDto);
    PatientDto toPatientDto(Patient patient);

    List<PatientDto> toPatientDtos(List<Patient> patients);

}
