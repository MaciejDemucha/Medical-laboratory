package com.example.jwt.backend.controllers;

import com.example.jwt.backend.dtos.AddressDto;
import com.example.jwt.backend.dtos.ExaminationDto;
import com.example.jwt.backend.dtos.LaboratoryDto;
import com.example.jwt.backend.dtos.ScheduleDto;
import com.example.jwt.backend.services.LaboratoryService;
import com.example.jwt.backend.services.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class LaboratoryController {

    private final LaboratoryService laboratoryService;
    private final ScheduleService scheduleService;

    @GetMapping("/laboratories")
    public ResponseEntity<List<LaboratoryDto>> allLaboratories(){
        return ResponseEntity.ok(laboratoryService.getAllLaboratories());
    }

    @GetMapping("/laboratories/address/{id}")
    public ResponseEntity<AddressDto> getLaboratoryAddress(@PathVariable Long id){
        return ResponseEntity.ok(laboratoryService.getLaboratoryAddress(id));
    }

    @GetMapping("/laboratories/schedule/{id}")
    public ResponseEntity<List<ScheduleDto>> getScheduleByLaboratoryId(@PathVariable Long id){
        return ResponseEntity.ok(scheduleService.getSchedulesByLaboratoryId(id));
    }
}
