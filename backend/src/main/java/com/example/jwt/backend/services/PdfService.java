package com.example.jwt.backend.services;

import com.example.jwt.backend.dtos.ExaminationDto;
import com.example.jwt.backend.dtos.OrderDetailsDto;
import com.example.jwt.backend.dtos.ParamWithNormDto;
import com.example.jwt.backend.dtos.PatientDto;
import com.example.jwt.backend.entites.ExaminationOffer;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.itextpdf.io.font.FontProgram;
import com.itextpdf.io.font.FontProgramFactory;
import com.itextpdf.io.font.PdfEncodings;
import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.color.Color;
import com.itextpdf.kernel.color.DeviceRgb;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.border.Border;
import com.itextpdf.layout.element.*;
import com.itextpdf.layout.property.TextAlignment;
import com.itextpdf.layout.property.VerticalAlignment;
import jakarta.servlet.http.HttpServletResponse;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import org.springframework.stereotype.Service;

import javax.swing.text.DateFormatter;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;


@Service
public class PdfService {
    public static final String ARIMO =
            "src/main/resources/Arimo-Regular.ttf";

    public byte[] generateResultsPDF(HttpServletResponse response, ExaminationDto examinationDto, List<ParamWithNormDto> params, PatientDto patient) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter pdfWriter = new PdfWriter(baos);
        PdfDocument pdfDocument = new PdfDocument(pdfWriter);
        Document document = new Document(pdfDocument);
        pdfDocument.setDefaultPageSize(PageSize.A4);
        //PdfWriter.getInstance(document, response.getOutputStream());


        FontProgram fontProgram = FontProgramFactory.createFont(ARIMO);
        PdfFont font = PdfFontFactory.createFont(fontProgram, PdfEncodings.IDENTITY_H, true);

        float col = 280f;
        float columnWidth[] = {col, col};
        Table table = new Table(columnWidth);

        table.setBackgroundColor(new DeviceRgb(63,169,219)).setFontColor(Color.WHITE);
        table.addCell(new Cell().add("Laboratorium medyczne")
                .setTextAlignment(TextAlignment.CENTER)
                .setVerticalAlignment(VerticalAlignment.MIDDLE)
                .setMarginTop(30f)
                .setMarginBottom(30f)
                .setFont(font)
                .setFontSize(30f)
                .setBorder(Border.NO_BORDER)
        );

       /* table.addCell(new Cell().add("Voucher")
                .setTextAlignment(TextAlignment.RIGHT)
                .setMarginTop(30f)
                .setMarginBottom(30f)
                .setBorder(Border.NO_BORDER)
                .setMarginRight(10f)
                .setFont(font)
        );*/

        float colWidth[] = {80, 300, 100, 80};
        Table personalInfoTable = new Table(colWidth);

        personalInfoTable.addCell(new Cell(0,4)
                .add("Dane badania")
                .setFont(font)
                .setBold());

        personalInfoTable.addCell(new Cell().add("Imię").setFont(font));
        personalInfoTable.addCell(new Cell().add(patient.getFirstName()).setFont(font));
        personalInfoTable.addCell(new Cell().add("Data badania").setFont(font));
        personalInfoTable.addCell(new Cell().add(examinationDto.getDatePerformed().toString()).setFont(font));
        personalInfoTable.addCell(new Cell().add("Nazwisko").setFont(font));
        personalInfoTable.addCell(new Cell().add(patient.getLastName()).setFont(font));
        personalInfoTable.addCell(new Cell().add("Numer badania").setFont(font));
        personalInfoTable.addCell(new Cell().add(String.valueOf(examinationDto.getNumber())).setFont(font));
        personalInfoTable.addCell(new Cell().add("Data urodzenia").setFont(font));
        personalInfoTable.addCell(new Cell().add(patient.getBirthDate().toString()).setFont(font));
        personalInfoTable.addCell(new Cell().add("Nazwa badania").setFont(font));
        personalInfoTable.addCell(new Cell().add(examinationDto.getName()).setFont(font));

        float itemInfoColWidth[] = {140, 140, 140, 140};
        Table itemInfoTable = new Table(itemInfoColWidth);

        itemInfoTable.addCell(new Cell().add("Nazwa").setBold().setFont(font).setTextAlignment(TextAlignment.CENTER).setFontSize(10));
        itemInfoTable.addCell(new Cell().add("Wartość").setBold().setFont(font).setTextAlignment(TextAlignment.CENTER).setFontSize(10));
        itemInfoTable.addCell(new Cell().add("Przedział").setBold().setFont(font).setTextAlignment(TextAlignment.CENTER).setFontSize(10));
        itemInfoTable.addCell(new Cell().add("Uwagi").setBold().setFont(font).setTextAlignment(TextAlignment.CENTER).setFontSize(10));
        for (ParamWithNormDto param: params) {
            itemInfoTable.addCell(new Cell().add(param.getName()).setFont(font).setTextAlignment(TextAlignment.CENTER).setFontSize(10));
            itemInfoTable.addCell(new Cell().add(param.getValue() + " " + param.getUnit()).setFont(font).setTextAlignment(TextAlignment.CENTER).setFontSize(10));
            itemInfoTable.addCell(new Cell().add(param.getMin() + " - " + param.getMax() + " " + param.getUnit()).setFont(font).setTextAlignment(TextAlignment.CENTER).setFontSize(10));
            if(param.getValue() > param.getMax())
                itemInfoTable.addCell(new Cell().add("Wartość powyżej normy").setFont(font).setFontColor(Color.RED).setTextAlignment(TextAlignment.CENTER).setFontSize(10));
            else if(param.getValue() < param.getMin())
                itemInfoTable.addCell(new Cell().add("Wartość poniżej normy").setFont(font).setFontColor(Color.RED).setTextAlignment(TextAlignment.CENTER).setFontSize(10));
            else
                itemInfoTable.addCell(new Cell().add("-").setFont(font).setTextAlignment(TextAlignment.CENTER).setFontSize(10));
        }

        document.add(table);
        document.add(new Paragraph("\n"));
        document.add(personalInfoTable);
        document.add(new Paragraph("\n"));
        document.add(itemInfoTable);

        document.close();
        return baos.toByteArray();


    }


    public static byte[] generateVoucher(OrderDetailsDto data, Long voucherId) throws IOException, WriterException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter pdfWriter = new PdfWriter(baos);
        PdfDocument pdfDocument = new PdfDocument(pdfWriter);
        Document document = new Document(pdfDocument);
        pdfDocument.setDefaultPageSize(PageSize.A4);

        DateTime dateTime = new DateTime();
        DateTimeFormatter formatter = DateTimeFormat.forPattern("dd/MM/yyyy HH:mm");

        FontProgram fontProgram = FontProgramFactory.createFont(ARIMO);
        PdfFont font = PdfFontFactory.createFont(fontProgram, PdfEncodings.IDENTITY_H, true);


        float col = 280f;
        float columnWidth[] = {col, col};
        Table table = new Table(columnWidth);

        table.setBackgroundColor(new DeviceRgb(63,169,219)).setFontColor(Color.WHITE);
        table.addCell(new Cell().add("Laboratorium medyczne")
                .setTextAlignment(TextAlignment.CENTER)
                .setVerticalAlignment(VerticalAlignment.MIDDLE)
                .setMarginTop(30f)
                .setMarginBottom(30f)
                .setFont(font)
                .setFontSize(30f)
                .setBorder(Border.NO_BORDER)
        );

        table.addCell(new Cell().add("Voucher")
                .setTextAlignment(TextAlignment.RIGHT)
                .setMarginTop(30f)
                .setMarginBottom(30f)
                .setBorder(Border.NO_BORDER)
                .setMarginRight(10f)
                .setFont(font)
        );

        byte[] bitmapData = generateQrCode(voucherId, 120, 120);
        ImageData voucherCode = ImageDataFactory.create(bitmapData);
        voucherCode.setHeight(120);
        Image imageVoucherCode = new Image(voucherCode);

        float colWidthCode[] = {560};
        Table voucherCodeTable = new Table(colWidthCode);
        voucherCodeTable.addCell(new Cell().add(imageVoucherCode).setTextAlignment(TextAlignment.CENTER).setBorder(Border.NO_BORDER));

        float colWidth[] = {80, 300, 100, 80};
        Table customerInfoTable = new Table(colWidth);

        customerInfoTable.addCell(new Cell(0,4)
                .add("Dane zamówienia")
                .setFont(font)
                .setBold());

        customerInfoTable.addCell(new Cell().add("Imię").setFont(font));
        customerInfoTable.addCell(new Cell().add(data.getFirstName()).setFont(font));
        customerInfoTable.addCell(new Cell().add("Data wygenerowania").setFont(font));
        customerInfoTable.addCell(new Cell().add(dateTime.toString(formatter)).setFont(font));
        customerInfoTable.addCell(new Cell().add("Nazwisko").setFont(font));
        customerInfoTable.addCell(new Cell().add(data.getLastName()).setFont(font));
        customerInfoTable.addCell(new Cell().add("Liczba badań").setFont(font));
        customerInfoTable.addCell(new Cell().add(String.valueOf(data.getBucket().size())).setFont(font));

        float itemInfoColWidth[] = {560};
        Table itemInfoTable = new Table(itemInfoColWidth);

        itemInfoTable.addCell(new Cell().add("Badania: ").setBold().setBorder(Border.NO_BORDER).setFont(font));
        for (ExaminationOffer examination: data.getBucket()) {
            itemInfoTable.addCell(new Cell().add(examination.getName()).setBorder(Border.NO_BORDER).setFont(font));
        }


        document.add(table);
        document.add(new Paragraph("\n"));
        document.add(voucherCodeTable);
        document.add(new Paragraph("\n"));
        document.add(customerInfoTable);
        document.add(new Paragraph("\n"));
        document.add(itemInfoTable);

        document.close();
        return baos.toByteArray();
    }

    public static byte[] generateQrCode(Long voucherId, int width, int height) throws WriterException, IOException {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(String.valueOf(voucherId), BarcodeFormat.QR_CODE, width, height);

        // Render the BitMatrix into a BufferedImage
        BufferedImage bufferedImage = MatrixToImageWriter.toBufferedImage(bitMatrix);

        // Convert BufferedImage to byte array
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        javax.imageio.ImageIO.write(bufferedImage, "png", baos);
        baos.flush();
        byte[] imageInByte = baos.toByteArray();
        baos.close();

        return imageInByte;
    }


}

