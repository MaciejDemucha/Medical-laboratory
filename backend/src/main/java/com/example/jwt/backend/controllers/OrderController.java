package com.example.jwt.backend.controllers;

import com.example.jwt.backend.dtos.LaboratoryDto;
import com.example.jwt.backend.entites.ExaminationOffer;
import com.example.jwt.backend.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class OrderController {
    private final OrderService orderService;
    @GetMapping("/offers")
    public ResponseEntity<List<ExaminationOffer>> allOffers(){
        return ResponseEntity.ok(orderService.getOffers());
    }
}
