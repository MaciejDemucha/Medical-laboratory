package com.example.jwt.backend.mappers;

import com.example.jwt.backend.dtos.ExaminationDto;
import com.example.jwt.backend.dtos.ParameterDto;
import com.example.jwt.backend.entites.Examination;
import com.example.jwt.backend.entites.Parameter;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ParameterMapper {
    Parameter toParameter(ParameterDto parameterDto);
    ParameterDto toParameterDto(Parameter parameter);

    List<ParameterDto> toParameterDtos(List<Parameter> parameters);
}
