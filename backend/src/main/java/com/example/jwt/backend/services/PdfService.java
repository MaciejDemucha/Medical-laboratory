package com.example.jwt.backend.services;

import com.example.jwt.backend.dtos.OrderDetailsDto;
import com.example.jwt.backend.entites.ExaminationOffer;
import com.example.jwt.backend.exceptions.AppException;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType0Font;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import java.io.File;
import java.io.IOException;
import java.util.*;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;


@Service
public class PdfService {

    public static byte[] export(OrderDetailsDto data, Long voucherId) throws IOException {
        try {
            List<ExaminationOffer> bucket = data.getBucket();

            PDDocument document = PDDocument.load(new File("src/main/resources/schemat.pdf"));
            PDPage page = document.getPage(0);
            PDPageContentStream contentStream = new PDPageContentStream(document, page, PDPageContentStream.AppendMode.APPEND, true, true);

            DateTime dateTime = new DateTime();
            DateTimeFormatter formatter = DateTimeFormat.forPattern("dd/MM/yyyy HH:mm");

            String[] liness = {
                    "Wygenerowano: " + (formatter.print(dateTime)),
                    "Identyfikator zamówienia: " + voucherId
            };

            // Load custom font from resources
            InputStream fontStream = PdfService.class.getClassLoader().getResourceAsStream("Arial.ttf");
            PDType0Font customFont = PDType0Font.load(document, fontStream);

            int y = 770;
            int x = 40;

            contentStream.beginText();
            // Set the custom font and font size
            contentStream.setFont(customFont, 24);
            contentStream.newLineAtOffset(x, y);
            contentStream.showText("Laboratorium medyczne");
            contentStream.endText();

             y = 770;
             x = 400;
            int fontSize = 11;
            float maxLineWidth = 135;

            for (String line : liness) {
                contentStream.beginText();
                // Set the custom font and font size
                contentStream.setFont(customFont, 12);
                contentStream.newLineAtOffset(x, y);
                contentStream.showText(line);
                contentStream.endText();
                y -= 50;
                x -=200;
                fontSize +=8;}

            StringBuilder string = new StringBuilder();
            y+=30;
            x = 20;
            fontSize = 12;
            float leading = 1.5f;

            string.append("\n Imię: " + data.getFirstName() + " \n" );
            string.append("\n Nazwisko: " + data.getLastName() + " \n" );

            y-=70;
            fontSize =12;
            string.append("\n " + "Badania: " + "\n");
            y-=70;

            for(int i =0; i < bucket.size(); i++){
                fontSize =12;
                string.append("\n " + bucket.get(i).getName() + "\n");
            }

            float currentX = x;
            float currentY = y;

            String[] lines = string.toString().split("\n");

            for (String line : lines) {

                float textWidth = customFont.getStringWidth(line) / 1000 * fontSize;

                if (currentX + textWidth > maxLineWidth) {
                    currentX = x;
                    currentY -= fontSize * leading;
                }

                if (currentY < 50) {
                    contentStream.close();
                    page = new PDPage();
                    document.addPage(page);
                    contentStream = new PDPageContentStream(document, page, PDPageContentStream.AppendMode.APPEND, true, true); // Tworzymy nowy strumień zawartości na nowej stronie
                    currentX = 20;
                    currentY = 750;
                }

                contentStream.beginText();
                // Set the custom font and font size
                contentStream.setFont(customFont, 12);
                //contentStream.setFont(PDType1Font.HELVETICA, fontSize);
                contentStream.newLineAtOffset(currentX, currentY);
                contentStream.showText(line);
                contentStream.endText();
                currentX += textWidth;
            }

            contentStream.close();
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            document.save(baos);
            document.close();
            return baos.toByteArray();

        } catch (IOException e) {
            e.printStackTrace();
            throw new IOException("Błąd generowania PDF");
        }
    }

    private static String[] splitLongText(String longText, float maxLineWidth, int fontSize) throws IOException {
        List<String> lines = new ArrayList<>();
        StringBuilder currentLine = new StringBuilder();

        for (String word : longText.split(" ")) {
            float wordWidth = PDType1Font.HELVETICA.getStringWidth(word) / 1000 * fontSize;

            if (currentLine.length() > 0 && currentLine.length() + wordWidth + fontSize < maxLineWidth) {
                currentLine.append(" ").append(word);
            } else {
                lines.add(currentLine.toString());
                currentLine = new StringBuilder(word);
            }
        }
        lines.add(currentLine.toString());
        return lines.toArray(new String[0]);
    }
}

