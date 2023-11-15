package com.example.jwt.backend.services;

import com.example.jwt.backend.dtos.OrderDetailsDto;
import com.example.jwt.backend.entites.ExaminationOffer;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType0Font;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

@Service
public class PdfService {
    public byte[] generatePdf(OrderDetailsDto data) throws IOException {
        try (PDDocument document = new PDDocument()) {
            PDPage page = new PDPage();
            document.addPage(page);

            PDPageContentStream contentStream = new PDPageContentStream(document, page);

            // Load custom font from resources
            InputStream fontStream = PdfService.class.getClassLoader().getResourceAsStream("Arial.ttf");
            PDType0Font customFont = PDType0Font.load(document, fontStream);

            // Set the custom font and font size
            contentStream.setFont(customFont, 12);

            contentStream.beginText();
            contentStream.newLineAtOffset(50, 700);

            // Add data to the PDF
            contentStream.showText("First Name: " + data.getFirstName());
            contentStream.newLine();
            contentStream.showText("Last Name: " + data.getLastName());
            contentStream.newLine();
            contentStream.showText("Email: " + data.getEmail());
            contentStream.newLine();

            if (data.getBucket() != null && !data.getBucket().isEmpty()) {
                contentStream.showText("Badania:");
                contentStream.newLine();

                for (ExaminationOffer examinationOffer : data.getBucket()) {
                    contentStream.showText("- " + examinationOffer.getName());
                    contentStream.newLine();
                }
            }
            contentStream.endText();

            contentStream.close();

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            document.save(baos);
            return baos.toByteArray();
        }
    }
}

