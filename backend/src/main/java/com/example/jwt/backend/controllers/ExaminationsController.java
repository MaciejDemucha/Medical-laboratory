package com.example.jwt.backend.controllers;

import com.example.jwt.backend.dtos.ExaminationDto;
import com.example.jwt.backend.services.ExaminationsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class ExaminationsController {

    private final ExaminationsService examinationsService;

    @GetMapping("/examinations")
    public ResponseEntity<List<ExaminationDto>> allExaminations(){
        return ResponseEntity.ok(examinationsService.allExaminations());
    }

    @GetMapping("/examinations/{id}")
    public ResponseEntity<ExaminationDto> allExaminations(@PathVariable Long id){
        return ResponseEntity.ok(examinationsService.getExamination(id));
    }

    @PostMapping("/examinations")
    public ResponseEntity<ExaminationDto> createExamination(@Valid @RequestBody ExaminationDto examinationDto){
        ExaminationDto createdExamination = examinationsService.createExamination(examinationDto);
        return ResponseEntity.created(URI.create("/examinations/" + createdExamination.getId())).body(createdExamination);
    }
}
