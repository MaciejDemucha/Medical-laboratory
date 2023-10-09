package com.example.jwt.backend.dtos;

public record CredentialsDto (String login, char[] password) { }