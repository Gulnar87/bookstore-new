package com.gulnar.bookstore.backend.service;

import java.time.Instant;
import java.time.ZonedDateTime;
import java.util.*;
import java.util.stream.Collectors;


import com.gulnar.bookstore.backend.domain.User;
import com.gulnar.bookstore.backend.repository.UserRepository;
import com.gulnar.bookstore.backend.web.res.errors.LoginAlreadyUsedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class UserServiceCustom {

    private final Logger log = LoggerFactory.getLogger(UserServiceCustom.class);
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public UserServiceCustom(
        UserRepository userRepository,
        PasswordEncoder passwordEncoder
 ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }



    public User registerUser(User userModel) {
//        userRepository.findOneByEmail(userModel.getEmailAddress().toLowerCase()).ifPresent(existingUser -> {
//         throw new LoginAlreadyUsedException();
//        });


        User user = new User();
//        user.setPassword(userModel.getPassword().toLowerCase());
        user.setFullName(userModel.getFullName());
        user.setEmailAddress(userModel.getEmailAddress());
        user.setCity(userModel.getCity().toLowerCase());
        user.setPhoneNumber(userModel.getPhoneNumber());



        String encryptedPassword = passwordEncoder.encode(userModel.getPassword());
        user.setPassword(encryptedPassword);

//        user.setPassword(userModel.getPassword());
        user = userRepository.save(user);

        System.out.println(user + "gulnar user");
        return user;
    }







}
