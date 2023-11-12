package com.example.jwt.backend.mappers;

import com.example.jwt.backend.dtos.ScheduleDto;
import com.example.jwt.backend.entites.Schedule;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ScheduleMapper {
    List<ScheduleDto> toScheduleDtos(List<Schedule> schedules);
}
