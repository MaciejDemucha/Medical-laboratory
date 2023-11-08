package com.example.jwt.backend.controllers;

import com.example.jwt.backend.dtos.NormRangeDto;
import com.example.jwt.backend.dtos.ParamWithNormDto;
import com.example.jwt.backend.dtos.ParameterDto;
import com.example.jwt.backend.services.ParameterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class ParameterController {
    private final ParameterService parameterService;


    @GetMapping("examinations/parameterswithnorms/{id}")
    public ResponseEntity<List<ParamWithNormDto>> getParametersAndNormsByExaminationId(@PathVariable Long id){
        List<ParameterDto> params = parameterService.getParameterByExaminationId(id);
        List<ParamWithNormDto> paramsToSend = new LinkedList<>();
        for (ParameterDto param:params) {
            NormRangeDto norm = parameterService.getNormRangeByParameterId(param.getId());
            ParamWithNormDto paramAndNorm = new ParamWithNormDto(param.getId(), param.getName(), param.getValue(),
                    norm.getId(), norm.getUnit(), norm.getMin(), norm.getMax());
            paramsToSend.add(paramAndNorm);
        }
        return ResponseEntity.ok(paramsToSend);
    }

}
