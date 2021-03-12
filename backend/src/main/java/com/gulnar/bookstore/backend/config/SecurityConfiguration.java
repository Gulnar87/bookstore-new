package com.gulnar.bookstore.backend.config;

import nl.eonics.jigler.security.AuthoritiesConstants;
import nl.eonics.jigler.security.jwt.JWTConfigurer;
import nl.eonics.jigler.security.jwt.TokenProvider;
import org.springframework.beans.factory.BeanInitializationException;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;
import org.zalando.problem.spring.web.advice.security.SecurityProblemSupport;

import javax.annotation.PostConstruct;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
@Import(SecurityProblemSupport.class)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    private final UserDetailsService userDetailsService;

    private final TokenProvider tokenProvider;

    private final CorsFilter corsFilter;

    private final SecurityProblemSupport problemSupport;

    public SecurityConfiguration(AuthenticationManagerBuilder authenticationManagerBuilder, UserDetailsService userDetailsService, TokenProvider tokenProvider, CorsFilter corsFilter, SecurityProblemSupport problemSupport) {
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.userDetailsService = userDetailsService;
        this.tokenProvider = tokenProvider;
        this.corsFilter = corsFilter;
        this.problemSupport = problemSupport;
    }

    @PostConstruct
    public void init() {
        try {
            authenticationManagerBuilder
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder());
        } catch (Exception e) {
            throw new BeanInitializationException("Security configuration failed", e);
        }
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
            .antMatchers(HttpMethod.OPTIONS, "/**")
            .antMatchers("/app/**/*.{js,html}")
            .antMatchers("/i18n/**")
            .antMatchers("/content/**")
            .antMatchers("/h2-console/**")
            .antMatchers("/swagger-ui/index.html")
            .antMatchers("/test/**");
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
            .csrf()
            .disable()
            .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)
            .exceptionHandling()
            .authenticationEntryPoint(problemSupport)
            .accessDeniedHandler(problemSupport)
        .and()
            .headers()
            .frameOptions()
            .disable()
        .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
            .authorizeRequests()
            .antMatchers("/api/register").permitAll()
            .antMatchers("/sitemap.xml").permitAll()
            .antMatchers("/details.css").permitAll()
            .antMatchers("/vacancy/**").permitAll()
            .antMatchers("/api/user-types").permitAll()
            .antMatchers("/api/activate").permitAll()
            .antMatchers("/api/authenticate").permitAll()
            .antMatchers("/api/account/reset-password/init").permitAll()
            .antMatchers("/api/account/reset-password/finish").permitAll()
            .antMatchers("/webresources/xml/**").permitAll()
            .antMatchers("/webresources/subscriptions/convert").permitAll()
            .antMatchers("/webresources/experience-levels/").permitAll()
            .antMatchers("/webresources/vacancy-features/").permitAll()
            .antMatchers("/webresources/vacancy-branches/").permitAll()
            .antMatchers("/webresources/vacancy-types/").permitAll()
            .antMatchers("/webresources/education-levels/").permitAll()
            .antMatchers("/webresources/vacancies/search").permitAll()
            .antMatchers("/webresources/vacancies/filtered/**").permitAll()
            .antMatchers("/webresources/vacancies/details/**").permitAll()
            .antMatchers("/webresources/vacancies/similar/**").permitAll()
            .antMatchers("/webresources/companies/company-name/**").permitAll()
            .antMatchers("/webresources/companies/user-ids/**").permitAll()
            .antMatchers("/webresources/subscriptions/no-account/**").permitAll()
            .antMatchers("/webresources/subscriptions/unsubscribe/**").permitAll()
            .antMatchers("/webresources/vacancy-applications/info-without-application").permitAll()
            .antMatchers("/webresources/icons/").permitAll()
            .antMatchers("/api/auth/kc/callback").permitAll()
            .antMatchers("/api/auth/kc/logout").permitAll()
            .antMatchers("/api/auth/kc/jwt").permitAll()
            .antMatchers("/webresources/**").authenticated()
            .antMatchers("/api/account/**").authenticated()
            .antMatchers("/api/vacancies").permitAll()
            .antMatchers("/api/**").hasAuthority(AuthoritiesConstants.ADMIN)
        .and()
            .apply(securityConfigurerAdapter());

    }

    private JWTConfigurer securityConfigurerAdapter() {
        return new JWTConfigurer(tokenProvider);
    }
}
