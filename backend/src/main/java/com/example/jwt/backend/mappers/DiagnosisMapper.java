package com.example.jwt.backend.mappers;

import com.example.jwt.backend.dtos.DiagnosisDto;
import com.example.jwt.backend.dtos.ExaminationDto;
import com.example.jwt.backend.entites.Diagnosis;
import com.example.jwt.backend.entites.Examination;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DiagnosisMapper {

    Diagnosis toDiagnosis(DiagnosisDto diagnosisDto);
    DiagnosisDto toDiagnosisDto(Diagnosis diagnosis);


    List<DiagnosisDto> toDiagnosisDtos(List<Diagnosis> diagnosisList);

    void updateDiagnosis(@MappingTarget Diagnosis target, Diagnosis source);
}
