package com.ecommerce.project.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        SecurityScheme securityScheme = new SecurityScheme().
                type(SecurityScheme.Type.HTTP).scheme("bearer").
                bearerFormat("JWT").
                description("JWT Token");
        SecurityRequirement securityRequirement = new SecurityRequirement().addList("Bearer Authentication");

        return new OpenAPI().
                info(new Info().title("Spring Boot Ecommerce Project").
                 description("This is Spring Boot Project")
                        .contact(new Contact().email("hjkhairnar2104@gmail.com").name("Harsh Khairnar")))
                .components(new Components().addSecuritySchemes("Bearer Authentication", securityScheme))
                .addSecurityItem(securityRequirement);


    }
}
