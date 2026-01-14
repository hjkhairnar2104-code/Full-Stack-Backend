package com.ecommerce.project.security.jwt;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class AuthTokenFilter extends OncePerRequestFilter {

    @Autowired
    private Jwtutil jwtutil;

    @Autowired
    private UserDetailsService userDetailsService;

    private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        logger.debug("doFilterInternal",request.getRequestURI());
        try {
            String jwt = parseJwt(request);
            if(jwt!=null && jwtutil.validateJwtToken(jwt)){
                String username = jwtutil.getuserfromtoken(jwt);
                UserDetails userDetails= userDetailsService.loadUserByUsername(username);
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(userDetails,
                                null,
                                userDetails.getAuthorities());
                logger.debug("Roles from JWT: {}", userDetails.getAuthorities());

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

        } catch (Exception e) {
            logger.error("parseJwt",e);
        }
        filterChain.doFilter(request,response);

    }

//    private String parseJwt(HttpServletRequest request) {
//        String jwt=jwtutil.getJwtCookies(request);
//        logger.debug("parseJwt",jwt);
//        return jwt;
//    }
private String parseJwt(HttpServletRequest request) {
    String jwtfromCookies=jwtutil.getJwtCookies(request);
    if(jwtfromCookies!=null){
        return jwtfromCookies;
    }
    String jwtfromheader=jwtutil.getJwtFromHeader(request);
    if(jwtfromheader!=null){
        return jwtfromheader;
    }
    return null;

}


}
