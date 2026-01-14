package com.ecommerce.project.security.response;

import java.util.List;

public class LoginResponse {


    private Long Id;
    private String token;
    private String username;
    private List<String> roles;

    public LoginResponse( Long Id,String username,String token, List<String> roles) {
        this.Id = Id;
        this.username = username;
        this.token = token;
        this.roles = roles;
    }

    public LoginResponse(Long Id, String username, List<String> roles) {
        this.Id = Id;
        this.username = username;
        this.roles = roles;
    }


    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
