package com.example.jwt.backend.services;

import com.example.jwt.backend.dtos.ExaminationDto;
import com.example.jwt.backend.entites.Examination;
import com.example.jwt.backend.entites.Patient;
import com.example.jwt.backend.exceptions.AppException;
import com.example.jwt.backend.mappers.ExaminationMapper;
import com.example.jwt.backend.repositories.ExaminationRepository;
import lombok.RequiredArgsConstructor;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class ExaminationsService {
    private final ExaminationRepository examinationRepository;
    private final ExaminationMapper examinationMapper;
    private final PatientService patientService;
    public List<ExaminationDto> allExaminations(){
        return examinationMapper.toExaminationDtos(examinationRepository.findAll());
    }

    public List<ExaminationDto> getExaminationByPatientId(Long id){
        Sort sortDate = Sort.by(Sort.Direction.DESC, "datePerformed");
        return examinationMapper.toExaminationDtos(examinationRepository.findByPatientId(id, sortDate));
    }


    public ExaminationDto getExamination(Long id){
        Examination examination = examinationRepository.findById(id)
                .orElseThrow(() -> new AppException("Examination not found", HttpStatus.NOT_FOUND));

        return examinationMapper.toExaminationDto(examination);
    }


    public ExaminationDto getExaminationByNumber(Long number, String password){
        /*boolean isPatient = patientService.isPatientByPesel(pesel);
        if(!isPatient){
            throw new AppException("Patient not found", HttpStatus.NOT_FOUND);
        }*/
        Examination examination = examinationRepository.findById(number)
                .orElseThrow(() -> new AppException("Examination not found", HttpStatus.NOT_FOUND));
        if(!examination.getPassword().equals(password)){
            throw new AppException("Wrong password for this examination", HttpStatus.NOT_FOUND);
        }

        return examinationMapper.toExaminationDto(examination);
    }

    private String generateExaminationPassword(){
        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 8;
        Random random = new Random();

        String generatedString = random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();

        return generatedString;
    }

    public Examination createExamination(ExaminationDto examinationDto, Patient patient) {

        Examination examination = examinationMapper.toExamination(examinationDto);
        examination.setPatient(patient);
        String password = generateExaminationPassword();

        try{
            examination.setPassword(password);
        }
        catch (ConstraintViolationException e){
            password = generateExaminationPassword();
            examination.setPassword(password);
        }

        Examination createdExamination =  examinationRepository.save(examination);

        return createdExamination;

    }

    public ExaminationDto deleteExamination(Long id) {
        Examination examination = examinationRepository.findById(id)
                .orElseThrow(() -> new AppException("Examination not found", HttpStatus.NOT_FOUND));

        examinationRepository.deleteById(examination.getId());

        return examinationMapper.toExaminationDto(examination);
    }

    public ExaminationDto updateExamination(Long id, ExaminationDto examinationDto) {
        Examination examination = examinationRepository.findById(id)
                .orElseThrow(() -> new AppException("Examination not found", HttpStatus.NOT_FOUND));

        examinationMapper.updateExamination(examination, examinationMapper.toExamination(examinationDto));

        Examination updatedExamination = examinationRepository.save(examination);

        return examinationMapper.toExaminationDto(updatedExamination);
    }
}
