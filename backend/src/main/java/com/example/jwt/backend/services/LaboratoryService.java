package com.example.jwt.backend.services;

import com.example.jwt.backend.dtos.AddressDto;
import com.example.jwt.backend.dtos.LaboratoryDto;
import com.example.jwt.backend.entites.Address;
import com.example.jwt.backend.entites.Laboratory;
import com.example.jwt.backend.exceptions.AppException;
import com.example.jwt.backend.mappers.AddressMapper;
import com.example.jwt.backend.mappers.LaboratoryMapper;
import com.example.jwt.backend.repositories.LaboratoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LaboratoryService {
    private final LaboratoryMapper laboratoryMapper;
    private final LaboratoryRepository laboratoryRepository;
    private final AddressMapper addressMapper;
    public List<LaboratoryDto> getAllLaboratories(){
        return laboratoryMapper.toLaboratoryDtos(laboratoryRepository.findAll());
    }

    public AddressDto getLaboratoryAddress(Long id){
        Laboratory laboratory = laboratoryRepository.findById(id)
                .orElseThrow(() -> new AppException("Laboratory not found", HttpStatus.NOT_FOUND));
        Address address = laboratory.getAddress();
        return addressMapper.toAddressDto(address);

    }
}
