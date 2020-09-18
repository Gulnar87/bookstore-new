package com.gulnar.bookstore.backend.web.res;

import com.gulnar.bookstore.backend.domain.Book;
import com.gulnar.bookstore.backend.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class BookController {

    @Autowired
    BookRepository bookRepository;


    @GetMapping("webresources/book-list")
    public List<Book> getBooks(){
       return bookRepository.findAll();
    }

    @GetMapping("webresources/book-list/details/{id}")
    public Book getBook(@PathVariable("id") int id){
        return bookRepository.findById(id).get();
    }

}
