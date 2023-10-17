package com.example.jwt.backend.services;

import com.example.jwt.backend.dtos.ExaminationDto;
import com.example.jwt.backend.dtos.NormRangeDto;
import com.example.jwt.backend.dtos.ParameterDto;
import com.example.jwt.backend.entites.NormRange;
import com.example.jwt.backend.mappers.ParameterMapper;
import com.example.jwt.backend.repositories.ParameterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ParameterService {
    private final ParameterMapper parameterMapper;
    private final ParameterRepository parameterRepository;

    public List<ParameterDto> getParameterByExaminationId(Long id){
        return parameterMapper.toParameterDtos(parameterRepository.findByExaminations_Id(id));
    }


}
