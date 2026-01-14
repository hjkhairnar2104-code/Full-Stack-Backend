package com.ecommerce.project.security.services;

import com.ecommerce.project.model.User;
import com.ecommerce.project.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImple implements UserDetailsService {

   @Autowired
   UserRepository userRepository;


    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       User user=userRepository.findByUserName(username).orElseThrow(()->new UsernameNotFoundException(("username not found with username"+username)));
       return UserDetailsImple.build(user);





    }
}
