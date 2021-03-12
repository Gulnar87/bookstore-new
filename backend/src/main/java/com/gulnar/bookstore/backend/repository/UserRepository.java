package com.gulnar.bookstore.backend.repository;

import nl.eonics.jigler.domain.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA repository for the User entity.
 */
@Repository
public interface UserRepositoryCustom extends JpaRepository<User, Long> {

    Optional<User> findOneById(Long id);

    // email is not unique due to concept accounts! This will only look for actual users
    default Optional<User> findOneByEmailIgnoreCase(String email) {
        return findOneByEmailIgnoreCaseAndUserExt_ConceptCandidateType(email, 0L);
    }

    Optional<User> findOneByEmailIgnoreCaseAndUserExt_ConceptCandidateType(String email, Long userExt_conceptCandidateType);

    List<User> findAllByEmailIgnoreCase(String email);

    Optional<User> findOneByLogin(String login);

    @Query("select u from User u Join Fetch u.userExt ue where u.email = :email and ue.conceptCandidateType = 0")
    Optional<User> findRealUserByEmail(@Param("email") String email);

    @Query("select u from User u Join Fetch u.userExt ue where ue.conceptAccountCreatorId = :companyId and ue.conceptCandidateType > 0 and u.email=:email")
    User findCCByCompanyId(@Param("companyId") Long companyId, @Param("email") String email);

    @Query("select u from User u Join Fetch u.userExt ue where ue.conceptAccountCreatorId = :companyId and ue.conceptCandidateType > 0 and u.email=:email")
    List<User> findAllCCByCompanyId(@Param("companyId") Long companyId, @Param("email") String email);

    @Query("select u from User u Join Fetch u.userExt ue where u.email = :email and ue.conceptCandidateType = 1 and ue.connectedToRealAccountId IS NULL")
    List<User> findCCsType1WithSameEmailAsRealAcount(@Param("email") String email);

    @Query("select u from User u Join Fetch u.userExt ue where u.email = :email and ue.conceptCandidateType = 2 and ue.connectedToRealAccountId IS NULL and ue.conceptAccountCreatorId = :compId")
    User findCCsType2WithSameEmailAsRealAcount(@Param("email") String email, @Param("compId") Long compId);

    @Query("select u from User u Join Fetch u.userExt ue where u.email = :email and ue.conceptCandidateType > 0 and ue.conceptAccountCreatorId = :compId")
    User findCCprofileByRealProfile(@Param("email") String email, @Param("compId") Long compId);
}
