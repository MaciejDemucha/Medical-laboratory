package com.example.jwt.backend.dtos;

public record SignUpDto (String firstName, String lastName, String login, char[] password) { }
