package com.example.jwt.backend.mappers;

import com.example.jwt.backend.dtos.PatientDto;
import com.example.jwt.backend.entites.Patient;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PatientMapper {

    @Mapping(source = "phone", target = "phone")
    @Mapping(source = "email", target = "email")
    Patient toPatient(PatientDto patientDto);
    PatientDto toPatientDto(Patient patient);

    List<PatientDto> toPatientDtos(List<Patient> patients);

}
