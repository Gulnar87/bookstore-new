package com.gulnar.bookstore.backend.web.res;


import com.codahale.metrics.annotation.Timed;

import com.gulnar.bookstore.backend.domain.User;
import com.gulnar.bookstore.backend.repository.UserRepository;
import com.gulnar.bookstore.backend.security.SecurityUtils;
import com.gulnar.bookstore.backend.web.res.errors.InternalServerErrorException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.web.bind.annotation.*;


import java.util.Optional;


/**
 * REST controller for managing the current user's account.
 */
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
@RequestMapping("webresources/account")
public class AccountController {

    private final Logger log = LoggerFactory.getLogger(AccountController.class);


    private final UserRepository userRepository;


    public AccountController(

            UserRepository userRepository
       ) {

        this.userRepository = userRepository;

    }



    @GetMapping
    @Timed
    public User getAccount() {
        long start = System.currentTimeMillis();
        User user = getCurrentUser();
//        User userModel = userModelMapper.toDto(user.getUserExt());
        log.debug("Get account takes " + (System.currentTimeMillis() - start) + " ms");
        return user;
    }




    private User getCurrentUser() {
        final String userLogin = SecurityUtils.getCurrentUserLogin()
                .orElseThrow(() -> new InternalServerErrorException("Current user login not found"));

        Optional<User> user = userRepository.findOneByEmailAddress(userLogin);
        if (!user.isPresent()) {
            throw new InternalServerErrorException("User could not be found");
        }

        return user.get();
    }
}

