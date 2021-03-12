package com.gulnar.bookstore.backend.web.res;

import com.codahale.metrics.annotation.Timed;
import nl.eonics.jigler.domain.Authority;
import nl.eonics.jigler.security.jwt.JWTFilter;
import nl.eonics.jigler.security.jwt.TokenProvider;
import nl.eonics.jigler.service.custom.KeycloakService;
import nl.eonics.jigler.service.TokenMappingQueryService;
import nl.eonics.jigler.service.TokenMappingService;
import nl.eonics.jigler.service.custom.UserServiceCustom;
import nl.eonics.jigler.service.dto.TokenMappingCriteria;
import nl.eonics.jigler.service.dto.TokenMappingDTO;
import nl.eonics.jigler.web.rest.errors.InternalServerErrorException;
import nl.eonics.jigler.web.rest.errors.UserNotFoundException;
import nl.eonics.jigler.web.rest.vm.LoginVM;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.github.jhipster.service.filter.StringFilter;
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
@RestController
@RequestMapping("/api")
public class UserJWTController {

    private final TokenProvider tokenProvider;

    private final AuthenticationManager authenticationManager;
    private final KeycloakService keycloakService;
    private final TokenMappingQueryService tokenMappingQueryService;
    private final TokenMappingService tokenMappingService;

    private final Logger log = LoggerFactory.getLogger(UserJWTController.class);
    private final UserServiceCustom userServiceCustom;

    public UserJWTController(TokenProvider tokenProvider, AuthenticationManager authenticationManager,
                             KeycloakService keycloakService, UserServiceCustom userServiceCustom,
                             TokenMappingQueryService tokenMappingQueryService,
                             TokenMappingService tokenMappingService) {
        this.tokenProvider = tokenProvider;
        this.authenticationManager = authenticationManager;
        this.keycloakService = keycloakService;
        this.userServiceCustom = userServiceCustom;
        this.tokenMappingQueryService = tokenMappingQueryService;
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

    @PostMapping(value = "/auth/kc/callback", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @Timed
    public RedirectView keycloakCallbackUrl(@RequestParam Map<String, String> postBody,
                                            RedirectAttributes attributes) {

        // Get the accesstoken keycloak created
        String access_token = postBody.get("access_token");

        // The state the client is in
        String state = postBody.getOrDefault("state", "");

        // Generate a nonce to authenticate the client in its next request
        String nonce = UUID.randomUUID().toString();

        // Check if the access token can be validated by keycloak
        if (keycloakService.checkUserLoggedIn(access_token)) {

            // Get the authorities for the logged in user from the database
            Claims claims = tokenProvider.parseKeycloakToken(access_token);
            String userLogin = claims.get("email", String.class);
            log.info("Finding keycloak user for " + userLogin);
            Set<Authority> authorities = userServiceCustom.getUserWithAuthoritiesByLogin(userLogin)
                .orElseThrow(UserNotFoundException::new).getAuthorities();

            // Map the authorities to Springboot GrantedAuthorities
            List<GrantedAuthority> grantedAuthorities = mapAuthoritiesToGrantedAuthorities(authorities);

            // Generate a new token that springboot will be able to authenticate
            Jwt jwt = tokenProvider.doGenerateToken(claims, (String) claims.get("email"));
            JwtAuthenticationToken authToken = new JwtAuthenticationToken(jwt, grantedAuthorities);

            // We have checked with keycloak, this user is authenticated
            authToken.setAuthenticated(true);
            SecurityContextHolder.getContext().setAuthentication(authToken);

            String idToken = tokenProvider.createToken(authToken, false);

            log.debug("Saving token with state: " + state);

            // Store the token so that the client can do a POST request later on to retrieve it
            log.info("Access token = "+access_token);
            log.info("state = "+state);
            log.info("nonce = "+nonce);
            log.info("userLogin = "+userLogin);


            TokenMappingDTO tokenMapping = getTokenMapping(state + nonce);
            if(tokenMapping == null) {
                TokenMappingDTO tokenMappingDTO = new TokenMappingDTO();
                tokenMappingDTO.setKey(state + nonce);
                tokenMappingDTO.setJwt(idToken);
                tokenMappingService.save(tokenMappingDTO);
//                tokenStorage.put(state + nonce, new JWTToken(idToken));
            }

            // Redirect to angular frontend which will request the token using the nonce
            attributes.addAttribute("nonce", nonce);
            return new RedirectView("/register-jwt", false);
        } else {
            throw new InternalServerErrorException("Keycloak token is not valid");
        }
    }

    private TokenMappingDTO getTokenMapping(String key) {
        TokenMappingCriteria tmc = new TokenMappingCriteria();
        StringFilter ksf = new StringFilter();
        ksf.setEquals(key);
        tmc.setKey(ksf);
        List<TokenMappingDTO> tokenMappings = tokenMappingQueryService.findByCriteria(tmc);
        if(tokenMappings.size() == 1) {
            return tokenMappings.get(0);
        } else if(tokenMappings.size() == 0) {
            return null;
        } else {
            throw new RuntimeException("Found multiple mappings for key " + key);
        }
    }

    @PostMapping(value = "/auth/kc/jwt", consumes = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<JWTToken> localJwtResponse(@RequestBody Map<String, String> postBody) {
        // Using the state that the client generated and the nonce the backend generated during the callback
        // Fetch the appropriate token
        // Nullable state for password reset, in which case there is never a client side state generated

        TokenMappingDTO tokenMappingDTO = getTokenMapping(Optional.ofNullable(postBody.get("state")).orElse("") + postBody.get("nonce"));

        if (tokenMappingDTO == null) {
            throw new InternalServerErrorException("Login failed: no token available.");
        } else {
            tokenMappingService.delete(tokenMappingDTO.getId());
        }

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JWTFilter.AUTHORIZATION_HEADER, "Bearer " + tokenMappingDTO.getJwt());

        return new ResponseEntity<>(new JWTToken(tokenMappingDTO.getJwt()), httpHeaders, HttpStatus.OK);
    }

    @GetMapping(value = "/auth/kc/logout")
    public RedirectView redirectToKeycloakLogout(RedirectAttributes attributes) {
        log.debug("Redirecting to keycloak logout");
        String redirect_url = AuthenticationController.FRONTEND_URL + "/";
        attributes.addAttribute("redirect_uri", redirect_url);
        return new RedirectView(KeycloakService.SERVER_URL + "/realms/" + KeycloakService.USER_REALM + "/protocol/openid-connect/logout", false);
    }

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
