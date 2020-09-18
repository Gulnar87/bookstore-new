import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';
import { Book } from '../shared/book.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  
})
export class BooksComponent implements OnInit {
  
  constructor(private bookService: BookService) { }

  ngOnInit() {
 
  }

}
