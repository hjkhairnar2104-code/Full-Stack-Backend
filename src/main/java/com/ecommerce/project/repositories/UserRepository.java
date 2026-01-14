package com.ecommerce.project.repositories;

import com.ecommerce.project.model.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {


    Optional<User> findByUserName(String userName);

    boolean existsByUserName(String userName);

    /**
     * Checks if a User exists with the given userEmail.
     */
    boolean existsByUserEmail(String userEmail);
}
