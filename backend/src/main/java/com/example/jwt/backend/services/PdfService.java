package com.example.jwt.backend.services;

import com.example.jwt.backend.dtos.OrderDetailsDto;
import com.example.jwt.backend.entites.ExaminationOffer;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.itextpdf.kernel.color.Color;
import com.itextpdf.kernel.color.DeviceRgb;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.border.Border;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.property.TextAlignment;
import com.itextpdf.layout.property.VerticalAlignment;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType0Font;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;


@Service
public class PdfService {

    public static byte[] export(OrderDetailsDto data, Long voucherId) throws IOException {
        try {
            List<ExaminationOffer> bucket = data.getBucket();

            String barcodeData = "Voucher:" + voucherId;
            BarcodeFormat barcodeFormat = BarcodeFormat.CODE_128;
            int width = 300;
            int height = 100;

            BitMatrix bitMatrix = new MultiFormatWriter().encode(barcodeData, barcodeFormat, width, height);
            // Convert the BitMatrix to a BufferedImage
            BufferedImage barcodeImage = MatrixToImageWriter.toBufferedImage(bitMatrix);

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



            // Embed the barcode image in the PDF
            //contentStream.drawImage(contentStream.getImageXObject(document, barcodeImage), 100, 500);

            StringBuilder string = new StringBuilder();
            y+=30;
            x = 20;
            fontSize = 12;
            float leading = 1.5f;

            string.append("\n Imię: " + data.getFirstName() + " \n" );
            string.append("\n Nazwisko: " + data.getLastName() + " \n" );


            fontSize =12;
            string.append("\n " + "Badania: " + "\n");


            for(int i =0; i < bucket.size(); i++){
                fontSize =12;
                string.append("\n - " + bucket.get(i).getName() + "\n");
            }

            y-=50;

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
        } catch (WriterException e) {
            throw new RuntimeException(e);
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

    public static byte[] generateVoucher(OrderDetailsDto data, Long voucherId) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        //String path = "C:\\pdf\\schemat.pdf";
        PdfWriter pdfWriter = new PdfWriter(baos);
        PdfDocument pdfDocument = new PdfDocument(pdfWriter);
        Document document = new Document(pdfDocument);
        pdfDocument.setDefaultPageSize(PageSize.A4);

        DateTime dateTime = new DateTime();
        DateTimeFormatter formatter = DateTimeFormat.forPattern("dd/MM/yyyy HH:mm");
        InputStream fontStream = PdfService.class.getClassLoader().getResourceAsStream("Arial.ttf");


        float col = 280f;
        float columnWidth[] = {col, col};
        Table table = new Table(columnWidth);

        table.setBackgroundColor(new DeviceRgb(63,169,219)).setFontColor(Color.WHITE);
        table.addCell(new Cell().add("Laboratorium medyczne")
                .setTextAlignment(TextAlignment.CENTER)
                .setVerticalAlignment(VerticalAlignment.MIDDLE)
                .setMarginTop(30f)
                .setMarginBottom(30f)
               // .setFont("Arial.ttf")
                .setFontSize(30f)
                .setBorder(Border.NO_BORDER)
        );

        table.addCell(new Cell().add("Voucher")
                .setTextAlignment(TextAlignment.RIGHT)
                .setMarginTop(30f)
                .setMarginBottom(30f)
                .setBorder(Border.NO_BORDER)
                .setMarginRight(10f)
                //.setFont("Arial.ttf")
        );

        float colWidth[] = {80, 300, 100, 80};
        Table customerInfoTable = new Table(colWidth);

        customerInfoTable.addCell(new Cell(0,4)
                .add("Dane zamówienia")
                .setBold());

        customerInfoTable.addCell(new Cell().add("Imie"));
        customerInfoTable.addCell(new Cell().add(data.getFirstName()));
        customerInfoTable.addCell(new Cell().add("Data wygenerowania"));
        customerInfoTable.addCell(new Cell().add(dateTime.toString(formatter)));
        customerInfoTable.addCell(new Cell().add("Nazwisko"));
        customerInfoTable.addCell(new Cell().add(data.getLastName()));
        customerInfoTable.addCell(new Cell().add("Liczba badan"));
        customerInfoTable.addCell(new Cell().add(String.valueOf(data.getBucket().size())));

        float itemInfoColWidth[] = {560};
        Table itemInfoTable = new Table(itemInfoColWidth);

        itemInfoTable.addCell(new Cell().add("Badania: ").setBold().setBorder(Border.NO_BORDER));
        for (ExaminationOffer examination: data.getBucket()) {
            itemInfoTable.addCell(new Cell().add(examination.getName()).setBold().setBorder(Border.NO_BORDER));
        }


        document.add(table);
        document.add(new Paragraph("\n"));
        document.add(customerInfoTable);
        document.add(new Paragraph("\n"));
        document.add(itemInfoTable);

        document.close();
        return baos.toByteArray();
    }


}

