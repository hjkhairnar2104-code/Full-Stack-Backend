package com.ecommerce.project.security.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpRequest {

    @NotBlank
    @Size(min = 2,max = 20)
    private String username;

    @NotBlank
    @Size(min=5,message = "Email should contains 5 words")
    @Email
    private String email;

    @NotBlank
    @Size(min=4,message = "Password should contains 5 words")
    private String password;
    private Set<String> roles;





}
