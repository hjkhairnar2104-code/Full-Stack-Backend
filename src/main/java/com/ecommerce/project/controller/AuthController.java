package com.ecommerce.project.controller;

import com.ecommerce.project.model.AppRole;
import com.ecommerce.project.model.Role;
import com.ecommerce.project.model.User;
import com.ecommerce.project.repositories.RoleRepository;
import com.ecommerce.project.repositories.UserRepository;
import com.ecommerce.project.security.jwt.Jwtutil;
import com.ecommerce.project.security.request.LoginRequest;
import com.ecommerce.project.security.request.SignUpRequest;
import com.ecommerce.project.security.response.LoginResponse;
import com.ecommerce.project.security.response.MessageResponse;
import com.ecommerce.project.security.services.UserDetailsImple;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private Jwtutil jwtutil;



    @Autowired
    private UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    RoleRepository roleRepository;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest){
        Authentication authentication;
        try{
            authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        }catch(Exception e){
            Map<String,Object> map = new HashMap<>();
            map.put("message","badcredential");
            map.put("status","error");
            map.put("error_description","Bad credential");
            return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
        }
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImple userDetails = (UserDetailsImple) authentication.getPrincipal();
        ResponseCookie jwtCookies= jwtutil.generateJwtCookies(userDetails);
        List<String> roles=userDetails.getAuthorities().stream().map(item->item.getAuthority())
                .collect(Collectors.toList());

        LoginResponse loginResponse=new LoginResponse(userDetails.getId(), userDetails.getUsername(),jwtCookies.toString(),roles);
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,
                        jwtCookies.toString())
                .body(loginResponse);
    }


    @PostMapping("/signup")
    public ResponseEntity<?> signupUser(@Valid @RequestBody SignUpRequest signUpRequest){
      if(userRepository.existsByUserName(signUpRequest.getUsername())){
          return ResponseEntity.badRequest().body(new MessageResponse("User is already exists"));
      }
      if(userRepository.existsByUserEmail(signUpRequest.getEmail())){
          return ResponseEntity.badRequest().body(new MessageResponse("Email is already exists"));
      }
      User user=new User(
              signUpRequest.getUsername(),
              signUpRequest.getEmail(),
              encoder.encode(signUpRequest.getPassword())
      );

        Set<String>strroles=signUpRequest.getRoles();
        Set<Role> roleSet=new HashSet<>();

        if(strroles==null){
            Role userrole=roleRepository.findByRoleName(AppRole.ROLE_USER).
                    orElseThrow(()->new RuntimeException("Role is not found"));
            roleSet.add(userrole);
        }
        else{
            strroles.forEach(role->{
                switch (role){
                    case "admin":
                       Role userrole=roleRepository.findByRoleName(AppRole.ROLE_ADMIN).
                               orElseThrow(()->new RuntimeException("Role is not found"));
                       roleSet.add(userrole);
                        break;
                    case "seller":
                        Role Usernewrole=roleRepository.findByRoleName(AppRole.ROLE_SELLER).
                                orElseThrow(()->new RuntimeException("Role is not found"));
                        roleSet.add(Usernewrole);
                        break;
                    default:
                        Role userrole1=roleRepository.findByRoleName(AppRole.ROLE_USER).
                                orElseThrow(()->new RuntimeException("Role is not found"));
                        roleSet.add(userrole1);
                }
            });
        }

        user.setRoles(roleSet);
        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));



    }











}
