package com.example.jwt.backend;

import com.example.jwt.backend.services.PdfService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) throws IOException {
		SpringApplication.run(BackendApplication.class, args);
	}

}
