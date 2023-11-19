package com.example.jwt.backend.controllers;

import com.example.jwt.backend.dtos.ExaminationDto;
import com.example.jwt.backend.dtos.ParamWithNormDto;
import com.example.jwt.backend.dtos.PatientDto;
import com.example.jwt.backend.services.ExaminationsService;
import com.example.jwt.backend.services.ParameterService;
import com.example.jwt.backend.services.PatientService;
import com.example.jwt.backend.services.PdfService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.net.URI;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class ExaminationsController {

    private final ExaminationsService examinationsService;
    private final PdfService pdfService;
    private final ParameterService parameterService;
    private final PatientService patientService;

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

    @GetMapping("/examinations/result/{pesel}/{number}")
    public ResponseEntity<ExaminationDto> getExaminationByNumber(@PathVariable String number, @PathVariable String pesel){
        return ResponseEntity.ok(examinationsService.getExaminationByNumber(number, pesel));
    }

    @GetMapping("/pdf/generate/{patientId}/{examinationId}")
    public ResponseEntity<InputStreamResource> generateResultsPDF(@PathVariable Long examinationId, @PathVariable Long patientId, HttpServletResponse response) throws IOException {
        try {
            ExaminationDto examinationDto = examinationsService.getExamination(examinationId);
            List<ParamWithNormDto> params = parameterService.getListOfParamsForExamination(examinationId);
            PatientDto patientDto = patientService.getPatientById(patientId);

            byte[] pdfContent = this.pdfService.generateResultsPDF(response, examinationDto, params, patientDto);

            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=example.pdf");
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


    @PostMapping("/examinations")
    public ResponseEntity<ExaminationDto> createExamination(@Valid @RequestBody ExaminationDto examinationDto){
        ExaminationDto createdExamination = examinationsService.createExamination(examinationDto);
        return ResponseEntity.created(URI.create("/examinations/" + createdExamination.getId())).body(createdExamination);
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
