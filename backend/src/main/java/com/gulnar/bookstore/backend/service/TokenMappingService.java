package com.gulnar.bookstore.backend.service;

import nl.eonics.jigler.domain.TokenMapping;
import nl.eonics.jigler.repository.TokenMappingRepository;
import nl.eonics.jigler.service.dto.TokenMappingDTO;
import nl.eonics.jigler.service.mapper.TokenMappingMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing TokenMapping.
 */
@Service
@Transactional
public class TokenMappingService {

    private final Logger log = LoggerFactory.getLogger(TokenMappingService.class);

    private final TokenMappingRepository tokenMappingRepository;

    private final TokenMappingMapper tokenMappingMapper;

    public TokenMappingService(TokenMappingRepository tokenMappingRepository, TokenMappingMapper tokenMappingMapper) {
        this.tokenMappingRepository = tokenMappingRepository;
        this.tokenMappingMapper = tokenMappingMapper;
    }

    /**
     * Save a tokenMapping.
     *
     * @param tokenMappingDTO the entity to save
     * @return the persisted entity
     */
    public TokenMappingDTO save(TokenMappingDTO tokenMappingDTO) {
        log.debug("Request to save TokenMapping : {}", tokenMappingDTO);

        TokenMapping tokenMapping = tokenMappingMapper.toEntity(tokenMappingDTO);
        tokenMapping = tokenMappingRepository.save(tokenMapping);
        return tokenMappingMapper.toDto(tokenMapping);
    }

    /**
     * Get all the tokenMappings.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<TokenMappingDTO> findAll() {
        log.debug("Request to get all TokenMappings");
        return tokenMappingRepository.findAll().stream()
            .map(tokenMappingMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one tokenMapping by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<TokenMappingDTO> findOne(Long id) {
        log.debug("Request to get TokenMapping : {}", id);
        return tokenMappingRepository.findById(id)
            .map(tokenMappingMapper::toDto);
    }

    /**
     * Delete the tokenMapping by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete TokenMapping : {}", id);
        tokenMappingRepository.deleteById(id);
    }
}
