package com.ecommerce.project.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long addressId;

    @NotBlank
    @Size(min=5,message = "Street name contain atleast 5 letter")
    private String street;

    @NotBlank
    @Size(min=5,message = "building name contain atleast 5 letter")
    private String buildingName;


    @NotBlank
    @Size(min=2,message = "city name contain atleast 5 letter")
    private String city;

    @NotBlank
    @Size(min=2,message = "state name contain atleast 5 letter")
    private String state;

    @NotBlank
    @Size(min=2,message = "country name contain atleast 5 letter")
    private String country;

    @NotBlank
    @Size(min=6,message = "zip name contain atleast 5 letter")
    private String zip;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


}
