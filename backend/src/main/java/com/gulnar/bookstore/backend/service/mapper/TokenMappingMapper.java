package com.gulnar.bookstore.backend.service.mapper;


import com.gulnar.bookstore.backend.domain.TokenMapping;
import com.gulnar.bookstore.backend.service.dto.TokenMappingDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity TokenMapping and its DTO TokenMappingDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TokenMappingMapper extends EntityMapper<TokenMappingDTO, TokenMapping> {

    default TokenMapping fromId(Long id) {
        if (id == null) {
            return null;
        }
        TokenMapping tokenMapping = new TokenMapping();
        tokenMapping.setId(id);
        return tokenMapping;
    }
}