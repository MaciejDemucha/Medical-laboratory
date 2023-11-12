package com.example.jwt.backend.mappers;

import com.example.jwt.backend.dtos.LaboratoryDto;
import com.example.jwt.backend.entites.Laboratory;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LaboratoryMapper {
    LaboratoryDto toLaboratoryDto(Laboratory laboratory);
    List<LaboratoryDto> toLaboratoryDtos(List<Laboratory> laboratories);
}
