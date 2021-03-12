package com.gulnar.bookstore.backend.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A TokenMapping.
 */
@Entity
@Table(name = "token_mapping")
public class TokenMapping implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_key")
    private String key;

    @Column(name = "jwt")
    private String jwt;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKey() {
        return key;
    }

    public TokenMapping key(String key) {
        this.key = key;
        return this;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getJwt() {
        return jwt;
    }

    public TokenMapping jwt(String jwt) {
        this.jwt = jwt;
        return this;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TokenMapping tokenMapping = (TokenMapping) o;
        if (tokenMapping.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tokenMapping.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TokenMapping{" +
            "id=" + getId() +
            ", key='" + getKey() + "'" +
            ", jwt='" + getJwt() + "'" +
            "}";
    }
}
