package com.example.jwt.backend.controllers;

import com.example.jwt.backend.dtos.ExaminationDto;
import com.example.jwt.backend.dtos.NormRangeDto;
import com.example.jwt.backend.dtos.ParameterDto;
import com.example.jwt.backend.services.NormRangeService;
import com.example.jwt.backend.services.ParameterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class ParameterController {
    private final ParameterService parameterService;
    private final NormRangeService normRangeService;

    @GetMapping("examinations/{id}/parameters")
    public ResponseEntity<List<ParameterDto>> getParametersByExaminationId(@PathVariable Long id){
        return ResponseEntity.ok(parameterService.getParameterByExaminationId(id));
    }

    @GetMapping("parameters/{id}/norms")
    public ResponseEntity<NormRangeDto> getNormByParameterId(@PathVariable Long id){
        return ResponseEntity.ok(parameterService.getNormRangeByParameterId(id));
    }
}
