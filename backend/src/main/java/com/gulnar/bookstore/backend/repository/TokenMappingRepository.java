package com.gulnar.bookstore.backend.repository;


import com.gulnar.bookstore.backend.domain.TokenMapping;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TokenMapping entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TokenMappingRepository extends JpaRepository<TokenMapping, Long>, JpaSpecificationExecutor<TokenMapping> {

}
