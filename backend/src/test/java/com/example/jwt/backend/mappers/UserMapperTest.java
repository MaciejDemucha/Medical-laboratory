package com.example.jwt.backend.mappers;

import com.example.jwt.backend.dtos.SignUpDto;
import com.example.jwt.backend.dtos.UserDto;
import com.example.jwt.backend.entites.User;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class UserMapperTest {
    private static UserMapper mapper;

    @BeforeAll
    public static void setUp() {
        mapper = new UserMapperImpl();
    }

    @Test
    void testUserMapper() {
        // given
        User user = User.builder()
                .id(1L)
                .firstName("Maciej")
                .lastName("Demucha")
                .login("login")
                .password("pass")
                .title("dr")
                .role("doctor")
                .build();

        // when
        UserDto userDto = mapper.toUserDto(user);

        // then
        assertAll(
                () -> {
                    assertEquals(user.getFirstName(), userDto.getFirstName());
                    assertEquals(user.getLastName(), userDto.getLastName());
                }
        );
    }

    @Test
    void testMapSignUp() {
        // given
        String firstName = "Jan";
        String lastName = "Nowak";
        String login = "login";
        char[] pass = "pass".toCharArray();
        String role = "doctor";

        SignUpDto signUpDto = new SignUpDto(role,firstName,lastName,login,pass);

        // when
        User user = mapper.signUpToUser(signUpDto);

        // then
        assertAll(() -> {
            assertEquals(signUpDto.firstName(), user.getFirstName());
            assertEquals(signUpDto.lastName(), user.getLastName());
            assertEquals(signUpDto.login(), user.getLogin());
        });
    }
}
