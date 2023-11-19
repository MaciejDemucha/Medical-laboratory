package com.example.jwt.backend.services;

import com.example.jwt.backend.dtos.NormRangeDto;
import com.example.jwt.backend.dtos.ParamWithNormDto;
import com.example.jwt.backend.dtos.ParameterDto;
import com.example.jwt.backend.entites.NormRange;
import com.example.jwt.backend.entites.Parameter;
import com.example.jwt.backend.mappers.NormRangeMapper;
import com.example.jwt.backend.mappers.ParameterMapper;
import com.example.jwt.backend.repositories.ParameterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ParameterService {
    private final ParameterMapper parameterMapper;
    private final ParameterRepository parameterRepository;
    private final NormRangeMapper normRangeMapper;

    public List<ParameterDto> getParameterByExaminationId(Long id){
        return parameterMapper.toParameterDtos(parameterRepository.findByExaminations_Id(id));
    }

    public NormRangeDto getNormRangeByParameterId(Long id){
        Optional<Parameter> parameterOptional = parameterRepository.findById(id);

        if (parameterOptional.isPresent()) {
            Parameter parameter = parameterOptional.get();
            NormRange normRange = parameter.getNormRange();
            return normRangeMapper.toNormRangeDto(normRange);
        } else {
            return null;
        }
    }

    public List<ParamWithNormDto> getListOfParamsForExamination(Long id){
        List<ParameterDto> params = getParameterByExaminationId(id);
        List<ParamWithNormDto> paramsToSend = new LinkedList<>();
        for (ParameterDto param:params) {
            NormRangeDto norm = getNormRangeByParameterId(param.getId());
            ParamWithNormDto paramAndNorm = new ParamWithNormDto(param.getId(), param.getName(), param.getValue(),
                    norm.getId(), norm.getUnit(), norm.getMin(), norm.getMax());
            paramsToSend.add(paramAndNorm);
        }
        return paramsToSend;
    }
}



