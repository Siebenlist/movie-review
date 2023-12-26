package com.example.back.auth;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    @NotBlank(message = "Not blank")
    @Column(nullable = false, length = 16)
    @Size(min = 4, max = 16, message = "The username length must be between 4 and 16 characters")
    private String username;
    @NotBlank(message = "Not blank")
    @Size(min = 4, max = 20, message = "The username length must be between 4 and 20 characters")
    private String password;
    @NotBlank(message = "Not blank")
    @Column(nullable = false, length = 50)
    @Email(message = "Invalid email address")
    private String email;
}


