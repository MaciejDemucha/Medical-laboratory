package com.example.jwt.backend.services;

import com.example.jwt.backend.dtos.NormRangeDto;
import com.example.jwt.backend.dtos.ParameterDto;
import com.example.jwt.backend.entites.NormRange;
import com.example.jwt.backend.entites.Parameter;
import com.example.jwt.backend.mappers.NormRangeMapper;
import com.example.jwt.backend.repositories.NormRangeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NormRangeService {
    private final NormRangeRepository normRangeRepository;
    private final NormRangeMapper normRangeMapper;

    public NormRange createNorm(NormRangeDto normRangeDto){
        NormRange normRange = normRangeMapper.toNormRange(normRangeDto);
        NormRange createdNorm = normRangeRepository.save(normRange);
        return createdNorm;
    }
}
