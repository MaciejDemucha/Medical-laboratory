package com.example.jwt.backend.services;

import com.example.jwt.backend.dtos.ExaminationDto;
import com.example.jwt.backend.dtos.NormRangeDto;
import com.example.jwt.backend.dtos.ParameterDto;
import com.example.jwt.backend.entites.NormRange;
import com.example.jwt.backend.entites.Parameter;
import com.example.jwt.backend.exceptions.AppException;
import com.example.jwt.backend.mappers.NormRangeMapper;
import com.example.jwt.backend.mappers.ParameterMapper;
import com.example.jwt.backend.repositories.ParameterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ParameterService {
    private final ParameterMapper parameterMapper;
    private final ParameterRepository parameterRepository;

    public List<ParameterDto> getParameterByExaminationId(Long id){
        return parameterMapper.toParameterDtos(parameterRepository.findByExaminations_Id(id));
    }

    public NormRangeDto getNormRangeByParameterId(Long id){
        Optional<Parameter> parameterOptional = parameterRepository.findById(id);

        if (parameterOptional.isPresent()) {
            Parameter parameter = parameterOptional.get();
            NormRange normRange = parameter.getNormRange();
            NormRangeDto dto = new NormRangeDto(normRange.getId(), normRange.getUnit(), normRange.getMin(), normRange.getMax());//normRangeMapper.toNormRangeDto(normRange);
            return dto;
        } else {
            // Handle the case when the order with the given ID doesn't exist.
            return null;
        }
    }
}



