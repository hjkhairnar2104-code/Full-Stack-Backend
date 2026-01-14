package com.ecommerce.project.security.jwt;

import com.ecommerce.project.security.services.UserDetailsImple;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

@Component
public class Jwtutil {

    private static final Logger LOGGER = LoggerFactory.getLogger(Jwtutil.class);

    @Value("${spring.app.jwtSecret}")
    private String jwtSecret;

    @Value("${spring.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    @Value("${spring.ecom.app.jwtCookieName}")
    private String jwtCookie;


    public String getJwtCookies(HttpServletRequest request) {
        Cookie cookie = WebUtils.getCookie(request,jwtCookie);
        if (cookie != null) {
            return cookie.getValue();
        }
        else{
            return null;
        }
    }
    public ResponseCookie  generateJwtCookies(UserDetailsImple  userPrincipal){
        String jwt=genrateTokenfromusername(userPrincipal.getUsername());
        ResponseCookie responseCookie= ResponseCookie.from(jwtCookie,jwt).
                path("/api").maxAge(24*60*60).
                httpOnly(false).
                secure(false).
                build();
        return responseCookie;
    }

//Generate jwt token from header.
    public String getJwtFromHeader(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        LOGGER.info("getJwtFromHeader bearerToken={}", bearerToken);
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    public String genrateTokenfromusername(String username) {

        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(new Date().getTime() + jwtExpirationMs))
                .signWith(key())
                .compact();

    }

    public String getuserfromtoken(String token) {
        return Jwts.parser()
                .verifyWith((SecretKey) key())
                .build().parseSignedClaims(token)
                .getPayload().getSubject();

    }


    public Key key() {
        return Keys.hmacShaKeyFor(
                Decoders.BASE64.decode(jwtSecret)
        );
    }

    public boolean validateJwtToken(String authToken) {
        try {
            System.out.println("Validate");
            Jwts.parser().verifyWith((SecretKey) key()).build().parseSignedClaims(authToken);
            return true;
        } catch (MalformedJwtException e) {
            LOGGER.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            LOGGER.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            LOGGER.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            LOGGER.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }



}
