package com.example.jwt.backend.services;

import com.example.jwt.backend.dtos.CredentialsDto;
import com.example.jwt.backend.dtos.UserDto;
import com.example.jwt.backend.entites.User;
import com.example.jwt.backend.mappers.UserMapper;
import com.example.jwt.backend.mappers.UserMapperImpl;
import com.example.jwt.backend.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

    @ExtendWith(MockitoExtension.class)
    public class UserServiceTest {

        @InjectMocks
        private UserService userService;

        @Mock
        private UserRepository userRepository;

        @Mock
        private PasswordEncoder passwordEncoder;

        @Spy
        private UserMapper userMapper = new UserMapperImpl();


        @Test
        public void testAuthentication() {
            // given
            CredentialsDto credentialsDto = new CredentialsDto("login", "password".toCharArray());

            User user = User.builder()
                    .firstName("first")
                    .lastName("last")
                    .login("login")
                    .password("password")
                    .title("dr")
                    .role("doctor")
                    .build();

            when(userRepository.findByLogin(credentialsDto.login()))
                    .thenReturn(Optional.of(user));

            when(passwordEncoder.matches(any(), any())).thenReturn(true);

            // when
            UserDto userDto = userService.login(credentialsDto);

            // then
            assertAll(() -> {
                assertEquals(user.getFirstName(), userDto.getFirstName());
                assertEquals(user.getLastName(), userDto.getLastName());
                assertEquals(user.getTitle(), userDto.getTitle());
                assertEquals(user.getRole(), userDto.getRole());
            });
            verify(userMapper).toUserDto(any());
            verify(passwordEncoder).matches(any(), any());
        }

        @Test
        void testFindByLogin() {
            // given
            String login = "login";

            User user = User.builder()
                    .firstName("first")
                    .lastName("last")
                    .build();

            when(userRepository.findByLogin(login))
                    .thenReturn(Optional.of(user));

            // when
            UserDto userDto = userService.findByLogin(login);

            // then
            assertAll(() -> {
                assertEquals(user.getFirstName(), userDto.getFirstName());
                assertEquals(user.getLastName(), userDto.getLastName());
            });
        }

    }
