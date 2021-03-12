package com.gulnar.bookstore.backend.security;



import org.springframework.stereotype.Component;

/**
 * Constants for Spring Security authorities.
 */
@Component
public final class AuthoritiesConstants {

    public static final String ADMIN = "ROLE_ADMIN";



    public static final String USER = "ROLE_USER";



    public static final String ANONYMOUS = "ROLE_ANONYMOUS";

    private AuthoritiesConstants() {
    }
}
