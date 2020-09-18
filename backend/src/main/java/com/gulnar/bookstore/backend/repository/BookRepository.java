package com.gulnar.bookstore.backend.repository;

import com.gulnar.bookstore.backend.domain.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Integer> {
}
