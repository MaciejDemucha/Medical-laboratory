package com.example.jwt.backend.services;

import com.example.jwt.backend.dtos.DiagnosisDto;
import com.example.jwt.backend.dtos.ExaminationDto;
import com.example.jwt.backend.entites.Diagnosis;
import com.example.jwt.backend.entites.Examination;
import com.example.jwt.backend.entites.User;
import com.example.jwt.backend.exceptions.AppException;
import com.example.jwt.backend.mappers.DiagnosisMapper;
import com.example.jwt.backend.repositories.DiagnosisRepository;
import com.example.jwt.backend.repositories.ExaminationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DiagnosisService {
    private final DiagnosisMapper diagnosisMapper;
    private final DiagnosisRepository diagnosisRepository;
    private final ExaminationRepository examinationRepository;

    public DiagnosisDto getDiagnosis(Long id){
        Diagnosis diagnosis = diagnosisRepository.findById(id)
                .orElseThrow(() -> new AppException("Diagnosis not found", HttpStatus.NOT_FOUND));

        return diagnosisMapper.toDiagnosisDto(diagnosis);
    }

    public List<DiagnosisDto> allDiagnosis(){
        return diagnosisMapper.toDiagnosisDtos(diagnosisRepository.findAll());
    }

    public DiagnosisDto createDiagnosis(DiagnosisDto diagnosisDto, Long examinationId) {
        Diagnosis diagnosis = diagnosisMapper.toDiagnosis(diagnosisDto);
        Examination examination = examinationRepository.findById(examinationId)
                .orElseThrow(() -> new AppException("Examination not found", HttpStatus.NOT_FOUND));
        diagnosis.setExamination(examination);
        Diagnosis createdDiagnosis =  diagnosisRepository.save(diagnosis);

        return diagnosisMapper.toDiagnosisDto(createdDiagnosis);
    }

    public DiagnosisDto deleteDiagnosis(Long id) {
        Diagnosis examination = diagnosisRepository.findById(id)
                .orElseThrow(() -> new AppException("Diagnosis not found", HttpStatus.NOT_FOUND));

        diagnosisRepository.deleteById(examination.getId());

        return diagnosisMapper.toDiagnosisDto(examination);
    }

    public DiagnosisDto updateDiagnosis(Long id, DiagnosisDto diagnosisDto) {
        Diagnosis diagnosis = diagnosisRepository.findById(id)
                .orElseThrow(() -> new AppException("Diagnosis not found", HttpStatus.NOT_FOUND));

        diagnosisMapper.updateDiagnosis(diagnosis, diagnosisMapper.toDiagnosis(diagnosisDto));

        Diagnosis updatedDiagnosis = diagnosisRepository.save(diagnosis);

        return diagnosisMapper.toDiagnosisDto(updatedDiagnosis);
    }
}
