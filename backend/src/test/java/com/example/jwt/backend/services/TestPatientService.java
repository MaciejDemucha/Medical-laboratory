package com.example.jwt.backend.services;

import com.example.jwt.backend.dtos.PatientDto;
import com.example.jwt.backend.entites.Gender;
import com.example.jwt.backend.entites.Patient;
import com.example.jwt.backend.entites.User;
import com.example.jwt.backend.mappers.PatientMapper;
import com.example.jwt.backend.mappers.PatientMapperImpl;
import com.example.jwt.backend.mappers.UserMapper;
import com.example.jwt.backend.mappers.UserMapperImpl;
import com.example.jwt.backend.repositories.GenderRepository;
import com.example.jwt.backend.repositories.PatientRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

import java.sql.Date;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class TestPatientService {

    @InjectMocks
    private PatientService patientService;

    @Mock
    private PatientRepository patientRepository;

    @Mock
    private GenderRepository genderRepository;

    @Spy
    private PatientMapper patientMapper = new PatientMapperImpl();

    @Test
    void testCreatePatient() {
        // given
        PatientDto patientDto = new PatientDto(null, "01300703817",
                        "first", "last",
                        "512435345", "mac.dem@gmail.com",
                        new Date(2001, 10, 7));

        Patient patient = Patient.builder()
                .id(10L)
                .pesel("01300703817")
                .firstName("first")
                .lastName("last")
                .phone("512435345")
                .email("mac.dem@gmail.com")
                .birthDate(new Date(2001, 10, 7))
                .gender(new Gender(1L, "male", null, null))
                .build();

        when(patientRepository.save(argThat(argument -> argument.getFirstName().equals(patientDto.getFirstName())
                && argument.getLastName().equals(patientDto.getLastName()) && argument.getPesel().equals(patientDto.getPesel())
                && argument.getPhone().equals(patientDto.getPhone()) && argument.getEmail().equals(patientDto.getEmail())
                && argument.getBirthDate().equals(patientDto.getBirthDate()))))
                .thenReturn(patient);
        when(genderRepository.findById(1L))
                .thenReturn(Optional.of(new Gender(1L, "male", null, null)));

        // when
      PatientDto created = patientService.createPatient(patientDto);

        // then
        assertAll(() -> {
            assertEquals(patientDto.getFirstName(), created.getFirstName());
            assertEquals(patientDto.getLastName(), created.getLastName());
            assertEquals(patientDto.getPesel(), created.getPesel());
            assertEquals(patientDto.getPhone(), created.getPhone());
            assertEquals(patientDto.getEmail(), created.getEmail());
            assertEquals(patientDto.getBirthDate(), created.getBirthDate());
        });
    }
}
