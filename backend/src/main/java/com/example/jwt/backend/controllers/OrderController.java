package com.example.jwt.backend.controllers;

import com.example.jwt.backend.dtos.LaboratoryDto;
import com.example.jwt.backend.dtos.OrderDetailsDto;
import com.example.jwt.backend.dtos.SignUpDto;
import com.example.jwt.backend.dtos.UserDto;
import com.example.jwt.backend.entites.ExaminationOffer;
import com.example.jwt.backend.entites.Voucher;
import com.example.jwt.backend.repositories.VoucherRepository;
import com.example.jwt.backend.services.EmailService;
import com.example.jwt.backend.services.OrderService;
import com.example.jwt.backend.services.PdfService;
import com.google.zxing.WriterException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.URI;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class OrderController {
    private final OrderService orderService;
    private final EmailService emailService;
    private final PdfService pdfService;
    private final VoucherRepository voucherRepository;
    @GetMapping("/offers")
    public ResponseEntity<List<ExaminationOffer>> allOffers(){
        return ResponseEntity.ok(orderService.getOffers());
    }

    @PostMapping("/order")
    public ResponseEntity<OrderDetailsDto> generateVoucher(@RequestBody @Valid OrderDetailsDto details) throws IOException, WriterException {
        Voucher voucher = new Voucher(null, details.getFirstName(), details.getLastName(), false, details.getBucket());
        Voucher savedVoucher = voucherRepository.save(voucher);

        byte[] attachment = PdfService.generateVoucher(details, savedVoucher.getId());

        emailService.sendEmailWithAttachment(details.getEmail(), "Sklep Laboratorium medyczne - potwierdzenie zamówienia","Dziękujemy za skorzystanie z naszej oferty", attachment, "Voucher.pdf");
        return ResponseEntity.ok(details);
    }

}
