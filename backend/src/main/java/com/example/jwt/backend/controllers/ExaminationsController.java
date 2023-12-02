package com.example.jwt.backend.controllers;

import com.example.jwt.backend.dtos.*;
import com.example.jwt.backend.entites.Examination;
import com.example.jwt.backend.entites.NormRange;
import com.example.jwt.backend.entites.Parameter;
import com.example.jwt.backend.entites.Patient;
import com.example.jwt.backend.mappers.PatientMapper;
import com.example.jwt.backend.repositories.NormRangeRepository;
import com.example.jwt.backend.services.*;
import org.apache.commons.csv.CSVParser;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URI;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class ExaminationsController {

    private final ExaminationsService examinationsService;
    private final PdfService pdfService;
    private final ParameterService parameterService;
    private final PatientService patientService;
    private final PatientMapper patientMapper;
    private final NormRangeService normRangeService;

    @GetMapping("/examinations")
    public ResponseEntity<List<ExaminationDto>> allExaminations(){
        return ResponseEntity.ok(examinationsService.allExaminations());
    }

    @GetMapping("patients/{id}/examinations")
    public ResponseEntity<List<ExaminationDto>> getExaminationByPatientId(@PathVariable Long id){
        return ResponseEntity.ok(examinationsService.getExaminationByPatientId(id));
    }


    @GetMapping("/examinations/{id}")
    public ResponseEntity<ExaminationDto> getExamination(@PathVariable Long id){
        return ResponseEntity.ok(examinationsService.getExamination(id));
    }

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

    @GetMapping("/examinations/result/{pesel}/{id}")
    public ResponseEntity<ExaminationDto> getExaminationByNumber(@PathVariable Long id, @PathVariable String pesel){
        return ResponseEntity.ok(examinationsService.getExaminationByNumber(id, pesel));
    }

    @GetMapping("/pdf/generate/{patientId}/{examinationId}")
    public ResponseEntity<InputStreamResource> generateResultsPDF(@PathVariable Long examinationId, @PathVariable Long patientId) throws IOException {
        try {
            ExaminationDto examinationDto = examinationsService.getExamination(examinationId);
            List<ParamWithNormDto> params = parameterService.getListOfParamsForExamination(examinationId);
            PatientDto patientDto = patientService.getPatientById(patientId);

            byte[] pdfContent = this.pdfService.generateResultsPDF(examinationDto, params, patientDto);

            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=result.pdf");
            headers.setContentType(MediaType.APPLICATION_PDF);

            return ResponseEntity
                    .ok()
                    .headers(headers)
                    .contentLength(pdfContent.length)
                    .body(new InputStreamResource(new ByteArrayInputStream(pdfContent)));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(500)
                    .body(null);
        }


    }


    @PostMapping(value = "/examinations", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Examination> createExamination(@RequestParam("patientId") String patientIdString, @RequestParam("file") MultipartFile file) throws IOException, ParseException {

        Long patientId = Long.parseLong(patientIdString);
        BufferedReader fileReader = new BufferedReader(new
                InputStreamReader(file.getInputStream(), "UTF-8"));
        CSVParser csvParser = new CSVParser(fileReader, CSVFormat.DEFAULT.withDelimiter(';'));

        List<CSVRecord> csvRecords = csvParser.getRecords();

        CSVRecord firstRecord = csvRecords.get(0);

        String pattern = "dd.MM.yyyy";
        DateFormat dateFormat = new SimpleDateFormat(pattern);
        java.util.Date utilDate = dateFormat.parse(firstRecord.get(1));
        java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());

        ExaminationDto examinationToCreate = new ExaminationDto(null, patientId, firstRecord.get(0), sqlDate);
        Patient patient = patientMapper.toPatient(patientService.getPatientById(patientId));
        Examination examination = examinationsService.createExamination(examinationToCreate, patient);

        for(int i = 1; i < csvRecords.size(); i++){

                CSVRecord csvRecord = csvRecords.get(i);
                NormRange norm = normRangeService.createNorm(new NormRangeDto(null,  csvRecord.get(4),Float.parseFloat(csvRecord.get(2)), Float.parseFloat(csvRecord.get(3))));
                Parameter parameter = parameterService.createParameter(new ParameterDto(null,csvRecord.get(0), Float.parseFloat(csvRecord.get(1))), norm, examination);

        }

        return ResponseEntity.created(URI.create("/examinations/" + examination.getId())).body(examination);

    }


    @DeleteMapping("/examinations/{id}")
    public ResponseEntity<ExaminationDto> deleteExamination(@PathVariable Long id){
        return ResponseEntity.ok(examinationsService.deleteExamination(id));
    }

    @PutMapping("/examinations/{id}")
    public ResponseEntity<ExaminationDto> updateExamination(@PathVariable Long id, @Valid @RequestBody ExaminationDto examinationDto){
        return ResponseEntity.ok(examinationsService.updateExamination(id, examinationDto));
    }
}
