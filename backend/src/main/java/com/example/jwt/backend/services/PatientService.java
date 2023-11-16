package com.example.jwt.backend.services;

import com.example.jwt.backend.dtos.AddressDto;
import com.example.jwt.backend.dtos.DoctorNameDto;
import com.example.jwt.backend.dtos.ExaminationDto;
import com.example.jwt.backend.dtos.PatientDto;
import com.example.jwt.backend.entites.*;
import com.example.jwt.backend.exceptions.AppException;
import com.example.jwt.backend.mappers.PatientMapper;
import com.example.jwt.backend.repositories.AddressRepository;
import com.example.jwt.backend.repositories.GenderRepository;
import com.example.jwt.backend.repositories.PatientRepository;
import com.example.jwt.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class PatientService {
    private final PatientMapper patientMapper;
    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final GenderRepository genderRepository;


    //TODO: register

    public List<PatientDto> allPatients(){
        return patientMapper.toPatientDtos(patientRepository.findAll());
    }

    public PatientDto getPatientById(Long id){
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new AppException("Patient not found", HttpStatus.NOT_FOUND));;
        return patientMapper.toPatientDto(patient);
    }

    public PatientDto getPatientByPesel(String pesel){
        Patient patient = patientRepository.findByPesel(pesel)
                .orElseThrow(() -> new AppException("Patient not found", HttpStatus.NOT_FOUND));
        return patientMapper.toPatientDto(patient);
    }

    public boolean isPatientByPesel(String pesel){

        if(patientRepository.existsByPesel(pesel)){
            return true;
        }
        else{
            throw new AppException("Unknown user", HttpStatus.NOT_FOUND);
        }
    }

    public List<PatientDto> getPatientsByDoctorId(Long id){
        List<Patient> patients = patientRepository.findByEmployee_Id(id);
        return patientMapper.toPatientDtos(patients);
    }

    public PatientDto assignEmployee(Long patientId, Long doctorId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new AppException("Patient not found", HttpStatus.NOT_FOUND));
        User employee = userRepository.findById(doctorId)
                .orElseThrow(() -> new AppException("Doctor not found", HttpStatus.NOT_FOUND));

        if (patient != null && employee != null) {
            patient.setEmployee(employee);
           patientRepository.save(patient);
           return patientMapper.toPatientDto(patient);
        }

        throw new AppException("Unknown doctor or patient", HttpStatus.NOT_FOUND); // Handle cases where either the patient or doctor is not found
    }

    public DoctorNameDto getPatientsDoctor(Long patientId){
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new AppException("Patient not found", HttpStatus.NOT_FOUND));

        User employee = patient.getEmployee();
        if(employee != null){
            return new DoctorNameDto(employee.getId(), employee.getTitle(), employee.getFirstName(), employee.getLastName());
        }

        throw new AppException("Unknown employee or patient", HttpStatus.NOT_FOUND);
    }

    public PatientDto createPatient(PatientDto patientDto) {
        Patient patient = patientMapper.toPatient(patientDto);
        if(patient.getGender() == null){
            String checkName = patient.getFirstName();
            Gender gender;
            if(checkName.charAt(checkName.length() - 1) == 'a'){
                gender = genderRepository.findById(2L).orElseThrow(() -> new AppException("Gender not found", HttpStatus.NOT_FOUND));
            }
            else {
                gender = genderRepository.findById(1L).orElseThrow(() -> new AppException("Gender not found", HttpStatus.NOT_FOUND));
            }
            patient.setGender(gender);
        }
        Patient createdPatient =  patientRepository.save(patient);

        return patientMapper.toPatientDto(createdPatient);

    }

    public PatientDto assignAddress(Long patientId, Long addressId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new AppException("Patient not found", HttpStatus.NOT_FOUND));
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new AppException("Address not found", HttpStatus.NOT_FOUND));

        if (patient != null && address != null) {
            patient.setAddress(address);
            patientRepository.save(patient);
            return patientMapper.toPatientDto(patient);
        }

        throw new AppException("Unknown address or patient", HttpStatus.NOT_FOUND);
    }


}
