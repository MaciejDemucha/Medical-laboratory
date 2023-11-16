package com.example.jwt.backend.services;

import com.example.jwt.backend.dtos.AddressDto;
import com.example.jwt.backend.entites.Address;
import com.example.jwt.backend.entites.Patient;
import com.example.jwt.backend.mappers.AddressMapper;
import com.example.jwt.backend.repositories.AddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;
    private final AddressMapper addressMapper;

    public AddressDto createAddress(AddressDto addressDto) {
        Address address = addressMapper.toAddress(addressDto);
        Address createdAddress =  addressRepository.save(address);

        return addressMapper.toAddressDto(createdAddress);

    }
}
