package com.example.jwt.backend.services;

import com.example.jwt.backend.dtos.CredentialsDto;
import com.example.jwt.backend.dtos.SignUpDto;
import com.example.jwt.backend.dtos.UserDto;
import com.example.jwt.backend.dtos.DoctorNameDto;
import com.example.jwt.backend.entites.User;
import com.example.jwt.backend.exceptions.AppException;
import com.example.jwt.backend.mappers.UserMapper;
import com.example.jwt.backend.repositories.UserRepository;
import lombok.*;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.util.*;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final UserMapper userMapper;

    public UserDto login(CredentialsDto credentialsDto) {
        User user = userRepository.findByLogin(credentialsDto.login())
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.password()), user.getPassword())) {
            return userMapper.toUserDto(user);
        }
        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    public UserDto register(SignUpDto signUpDto) {
        Optional<User> optionalUser = userRepository.findByLogin(signUpDto.login());

        if (optionalUser.isPresent()) {
            throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
        }

        User user = userMapper.signUpToUser(signUpDto);
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(signUpDto.password())));

        User savedUser = userRepository.save(user);

        return userMapper.toUserDto(savedUser);
    }

    public UserDto findByLogin(String login) {
        User user = userRepository.findByLogin(login)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        return userMapper.toUserDto(user);
    }

    public List<DoctorNameDto> getAll(){
        List<UserDto> doctors = userMapper.toUserDtos(userRepository.findAll());
        List<DoctorNameDto> doctorNames = new LinkedList<>();
        for (UserDto doctor:doctors) {
            doctorNames.add(new DoctorNameDto(doctor.getId(),doctor.getFirstName(),doctor.getLastName()));
        }
        return doctorNames;
    }


}
