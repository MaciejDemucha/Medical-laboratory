package com.example.jwt.backend.mappers;

import com.example.jwt.backend.dtos.ExaminationDto;
import com.example.jwt.backend.dtos.NormRangeDto;
import com.example.jwt.backend.entites.Examination;
import com.example.jwt.backend.entites.NormRange;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface NormRangeMapper {
    NormRange toNormRange(NormRangeDto normRangeDto);
    NormRangeDto toNormRangeDto(NormRange normRange);

    List<NormRangeDto> toNormRangeDtos(List<NormRange> normRanges);
}
