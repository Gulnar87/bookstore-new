package com.gulnar.bookstore.backend.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the TokenMapping entity.
 */
public class TokenMappingDTO implements Serializable {

    private Long id;

    private String key;

    private String jwt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TokenMappingDTO tokenMappingDTO = (TokenMappingDTO) o;
        if (tokenMappingDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tokenMappingDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TokenMappingDTO{" +
            "id=" + getId() +
            ", key='" + getKey() + "'" +
            ", jwt='" + getJwt() + "'" +
            "}";
    }
}
