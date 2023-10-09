package com.example.jwt.backend.services;

import com.example.jwt.backend.dtos.ExaminationDto;
import com.example.jwt.backend.entites.Examination;
import com.example.jwt.backend.exceptions.AppException;
import com.example.jwt.backend.mappers.ExaminationMapper;
import com.example.jwt.backend.repositories.ExaminationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExaminationsService {
    private final ExaminationRepository examinationRepository;
    private final ExaminationMapper examinationMapper;
    public List<ExaminationDto> allExaminations(){
        return examinationMapper.toExaminationDtos(examinationRepository.findAll());
    }

    public ExaminationDto getExamination(Long id){
        Examination examination = examinationRepository.findById(id)
                .orElseThrow(() -> new AppException("Examination not found", HttpStatus.NOT_FOUND));
        return examinationMapper.toExaminationDto(examination);
    }

    public ExaminationDto createExamination(ExaminationDto examinationDto) {
        Examination examination = examinationMapper.toExamination(examinationDto);
        Examination createdExamination =  examinationRepository.save(examination);

        return examinationMapper.toExaminationDto(createdExamination);

    }
}
