package com.example.jwt.backend.services;

import com.example.jwt.backend.dtos.DiagnosisDto;
import com.example.jwt.backend.dtos.ParameterDto;
import com.example.jwt.backend.dtos.ScheduleDto;
import com.example.jwt.backend.entites.Diagnosis;
import com.example.jwt.backend.entites.Schedule;
import com.example.jwt.backend.exceptions.AppException;
import com.example.jwt.backend.mappers.ScheduleMapper;
import com.example.jwt.backend.repositories.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;
    private final ScheduleMapper scheduleMapper;

    public List<ScheduleDto> getSchedulesByLaboratoryId(Long id){
        return scheduleMapper.toScheduleDtos(scheduleRepository.findByLaboratory_Id(id));
    }
}
