package com.example.jwt.backend.services;

import com.example.jwt.backend.entites.ExaminationOffer;
import com.example.jwt.backend.repositories.ExaminationOfferRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final ExaminationOfferRepository examinationOfferRepository;

    public List<ExaminationOffer> getOffers(){
        return examinationOfferRepository.findAll();
    }

}
