package com.ecommerce.project.security.services;

import com.ecommerce.project.model.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@NoArgsConstructor
@Data
@Component
public class UserDetailsImple implements UserDetails {
    private static final long serialVersionUID = 1L;

    private Long id;

    private String username;

    private String password;

    private String  email;

    private Collection<? extends GrantedAuthority> authorities;


    public UserDetailsImple(Long id, String username, String password, String email, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.authorities = authorities;
    }


    public static UserDetailsImple build(User user){
        List<GrantedAuthority> grantedAuthorities = user.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getRoleName().name())).collect(Collectors.toList());

        return new UserDetailsImple(
                user.getUserId(),
                user.getUserName(),
                user.getUserPassword(),
                user.getUserEmail(),
                grantedAuthorities
        );
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        UserDetailsImple that = (UserDetailsImple) o;
        return Objects.equals(id, that.id) && Objects.equals(username, that.username) && Objects.equals(password, that.password) && Objects.equals(email, that.email) && Objects.equals(authorities, that.authorities);
    }


}
