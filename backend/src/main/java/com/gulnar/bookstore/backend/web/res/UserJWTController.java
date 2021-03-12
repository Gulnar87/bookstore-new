package com.gulnar.bookstore.backend.web.res;

import com.codahale.metrics.annotation.Timed;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.gulnar.bookstore.backend.domain.Authority;
import com.gulnar.bookstore.backend.security.jwt.JWTFilter;
import com.gulnar.bookstore.backend.security.jwt.TokenProvider;
//import com.gulnar.bookstore.backend.service.TokenMappingQueryService;
import com.gulnar.bookstore.backend.service.TokenMappingService;
import com.gulnar.bookstore.backend.service.UserService;
//import com.gulnar.bookstore.backend.service.dto.TokenMappingCriteria;
import com.gulnar.bookstore.backend.service.dto.TokenMappingDTO;
import com.gulnar.bookstore.backend.web.res.vm.LoginVM;
//import io.github.jhipster.service.filter.StringFilter;
import io.jsonwebtoken.Claims;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;



import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Controller to authenticate users.
 */
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
@RequestMapping("/api")
public class UserJWTController {

    private final TokenProvider tokenProvider;

    private final AuthenticationManager authenticationManager;

//    private final TokenMappingQueryService tokenMappingQueryService;
    private final TokenMappingService tokenMappingService;

    private final Logger log = LoggerFactory.getLogger(UserJWTController.class);
    private final UserService userService;

    public UserJWTController(TokenProvider tokenProvider, AuthenticationManager authenticationManager,
                           UserService userService,
//                             TokenMappingQueryService tokenMappingQueryService,
                             TokenMappingService tokenMappingService) {
        this.tokenProvider = tokenProvider;
        this.authenticationManager = authenticationManager;

        this.userService = userService;
//        this.tokenMappingQueryService = tokenMappingQueryService;
        this.tokenMappingService = tokenMappingService;
    }

    @PostMapping("/authenticate")
    @Timed
    public ResponseEntity<JWTToken> authorize(@Valid @RequestBody LoginVM loginVM) {

        UsernamePasswordAuthenticationToken authenticationToken =
            new UsernamePasswordAuthenticationToken(loginVM.getUsername(), loginVM.getPassword());

        Authentication authentication = this.authenticationManager.authenticate(authenticationToken);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        boolean rememberMe = (loginVM.isRememberMe() == null) ? false : loginVM.isRememberMe();
        String jwt = tokenProvider.createToken(authentication, rememberMe);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JWTFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);
        return new ResponseEntity<>(new JWTToken(jwt), httpHeaders, HttpStatus.OK);
    }



//    private TokenMappingDTO getTokenMapping(String key) {
//        TokenMappingCriteria tmc = new TokenMappingCriteria();
//        StringFilter ksf = new StringFilter();
//        ksf.setEquals(key);
//        tmc.setKey(ksf);
//        List<TokenMappingDTO> tokenMappings = tokenMappingQueryService.findByCriteria(tmc);
//        if(tokenMappings.size() == 1) {
//            return tokenMappings.get(0);
//        } else if(tokenMappings.size() == 0) {
//            return null;
//        } else {
//            throw new RuntimeException("Found multiple mappings for key " + key);
//        }
//    }





    private static List<GrantedAuthority> mapAuthoritiesToGrantedAuthorities(Collection<Authority> authorities) {
        return authorities.stream().map(Authority::getName)
            .filter(role -> role.startsWith("ROLE_"))
            .map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }


    /**
     * Object to return as body in JWT Authentication.
     */
    static class JWTToken {

        private String idToken;

        JWTToken(String idToken) {
            this.idToken = idToken;
        }

        @JsonProperty("id_token")
        String getIdToken() {
            return idToken;
        }

        void setIdToken(String idToken) {
            this.idToken = idToken;
        }
    }
}
