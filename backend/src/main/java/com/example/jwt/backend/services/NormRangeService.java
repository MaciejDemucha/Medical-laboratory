package com.example.jwt.backend.services;

import com.example.jwt.backend.dtos.NormRangeDto;
import com.example.jwt.backend.entites.NormRange;
import com.example.jwt.backend.exceptions.AppException;
import com.example.jwt.backend.mappers.NormRangeMapper;
import com.example.jwt.backend.repositories.NormRangeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class NormRangeService {
    private final NormRangeMapper normRangeMapper;
    private final NormRangeRepository normRangeRepository;
    //public NormRangeDto getNormByParameterId(Long id) {
        //NormRange normRange = normRangeRepository.findByParameter_Id(id)
                //.orElseThrow(() -> new AppException("Unknown norm", HttpStatus.NOT_FOUND));
      // NormRange normRange = normRangeRepository.findOne(1L);
        //Address address = user.getAddress();
       // return normRangeMapper.toNormRangeDto(normRange);
    //}
}
