//package com.gulnar.bookstore.backend.service;
//
//import java.util.List;
//
//import com.gulnar.bookstore.backend.domain.TokenMapping;
//import com.gulnar.bookstore.backend.repository.TokenMappingRepository;
//
//import com.gulnar.bookstore.backend.service.dto.TokenMappingCriteria;
//import com.gulnar.bookstore.backend.service.dto.TokenMappingDTO;
//import com.gulnar.bookstore.backend.service.mapper.TokenMappingMapper;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.jpa.domain.Specification;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import io.github.jhipster.service.QueryService;
//
//
///**
// * Service for executing complex queries for TokenMapping entities in the database.
// * The main input is a {@link TokenMappingCriteria} which gets converted to {@link Specification},
// * in a way that all the filters must apply.
// * It returns a {@link List} of {@link TokenMappingDTO} or a {@link Page} of {@link TokenMappingDTO} which fulfills the criteria.
// */
//@Service
//@Transactional(readOnly = true)
//public class TokenMappingQueryService extends QueryService<TokenMapping> {
//
//    private final Logger log = LoggerFactory.getLogger(TokenMappingQueryService.class);
//
//    private final TokenMappingRepository tokenMappingRepository;
//
//    private final TokenMappingMapper tokenMappingMapper;
//
//    public TokenMappingQueryService(TokenMappingRepository tokenMappingRepository, TokenMappingMapper tokenMappingMapper) {
//        this.tokenMappingRepository = tokenMappingRepository;
//        this.tokenMappingMapper = tokenMappingMapper;
//    }
//
//    /**
//     * Return a {@link List} of {@link TokenMappingDTO} which matches the criteria from the database
//     * @param criteria The object which holds all the filters, which the entities should match.
//     * @return the matching entities.
//     */
//    @Transactional(readOnly = true)
//    public List<TokenMappingDTO> findByCriteria(TokenMappingCriteria criteria) {
//        log.debug("find by criteria : {}", criteria);
//        final Specification<TokenMapping> specification = createSpecification(criteria);
//        return tokenMappingMapper.toDto(tokenMappingRepository.findAll(specification));
//    }
//
//    /**
//     * Return a {@link Page} of {@link TokenMappingDTO} which matches the criteria from the database
//     * @param criteria The object which holds all the filters, which the entities should match.
//     * @param page The page, which should be returned.
//     * @return the matching entities.
//     */
//    @Transactional(readOnly = true)
//    public Page<TokenMappingDTO> findByCriteria(TokenMappingCriteria criteria, Pageable page) {
//        log.debug("find by criteria : {}, page: {}", criteria, page);
//        final Specification<TokenMapping> specification = createSpecification(criteria);
//        return tokenMappingRepository.findAll(specification, page)
//            .map(tokenMappingMapper::toDto);
//    }
//
//    /**
//     * Return the number of matching entities in the database
//     * @param criteria The object which holds all the filters, which the entities should match.
//     * @return the number of matching entities.
//     */
//    @Transactional(readOnly = true)
//    public long countByCriteria(TokenMappingCriteria criteria) {
//        log.debug("count by criteria : {}", criteria);
//        final Specification<TokenMapping> specification = createSpecification(criteria);
//        return tokenMappingRepository.count(specification);
//    }
//
//    /**
//     * Function to convert TokenMappingCriteria to a {@link Specification}
//     */
//    private Specification<TokenMapping> createSpecification(TokenMappingCriteria criteria) {
//        Specification<TokenMapping> specification = Specification.where(null);
//        if (criteria != null) {
//            if (criteria.getId() != null) {
//                specification = specification.and(buildSpecification(criteria.getId(), TokenMapping_.id));
//            }
//            if (criteria.getKey() != null) {
//                specification = specification.and(buildStringSpecification(criteria.getKey(), TokenMapping_.key));
//            }
//            if (criteria.getJwt() != null) {
//                specification = specification.and(buildStringSpecification(criteria.getJwt(), TokenMapping_.jwt));
//            }
//        }
//        return specification;
//    }
//}
