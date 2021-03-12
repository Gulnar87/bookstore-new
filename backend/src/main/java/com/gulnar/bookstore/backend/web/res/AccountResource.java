package com.gulnar.bookstore.backend.web.res;
import javax.transaction.Transactional;
import com.gulnar.bookstore.backend.domain.User;
import com.gulnar.bookstore.backend.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.codahale.metrics.annotation.Timed;


/**
 * REST controller for managing the current user's account.
 */
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
@RequestMapping("/api")
public class AccountResource {

    private final Logger log = LoggerFactory.getLogger(AccountResource.class);
    private final UserService userService;

    public AccountResource(
            UserService userService) {
        this.userService = userService;
    }


    @PostMapping("/register")
    @Timed
    @Transactional
    @ResponseStatus(HttpStatus.CREATED)
    public void registerAccount( @RequestBody User user) {

        System.out.println(user + "gulnar user");

        User registerUser = userService.registerUser(

                user
        );

        log.info("Register complete.");
    }


}
