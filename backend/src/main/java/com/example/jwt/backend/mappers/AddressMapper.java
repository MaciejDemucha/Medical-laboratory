package com.example.jwt.backend.mappers;

import com.example.jwt.backend.dtos.AddressDto;
import com.example.jwt.backend.entites.Address;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AddressMapper {
    AddressDto toAddressDto(Address address);
}
