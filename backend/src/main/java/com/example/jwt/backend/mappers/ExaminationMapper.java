package com.example.jwt.backend.mappers;

import com.example.jwt.backend.dtos.ExaminationDto;
import com.example.jwt.backend.entites.Examination;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ExaminationMapper {
    Examination toExamination(ExaminationDto examinationDto);
    @Mapping(source = "patient.id", target = "patientId")
    ExaminationDto toExaminationDto(Examination examination);

    List<ExaminationDto> toExaminationDtos(List<Examination> examinations);

    void updateExamination(@MappingTarget Examination target, Examination source);
}
