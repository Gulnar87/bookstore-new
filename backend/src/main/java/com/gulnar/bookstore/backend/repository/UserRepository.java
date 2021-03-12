package com.gulnar.bookstore.backend.repository;
import com.gulnar.bookstore.backend.domain.User;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.Cacheable;
import java.time.Instant;
import java.util.List;
import java.util.Optional;


/**
 * Spring Data JPA repository for the User entity.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findOneByEmailAddress(String login);

//    @EntityGraph(attributePaths = "authorities")
////    @Cacheable(cacheNames = USERS_BY_LOGIN_CACHE)
//    Optional<User> findOneWithAuthoritiesByLogin(String login);

    @EntityGraph(attributePaths = "authorities")
//    @Cacheable(cacheNames = USERS_BY_EMAIL_CACHE)
    Optional<User> findOneWithAuthoritiesByEmailAddress(String email);


}
