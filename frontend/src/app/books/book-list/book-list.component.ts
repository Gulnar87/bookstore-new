import { Component, ViewChild, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from '../../shared/book.model';
import { BookService } from '../book.service';
import { FilterService } from '../../shared/filter-service';



@Component({
  selector: 'app-book-list',
  moduleId: 'src/app/app.component',
  templateUrl: './book-list.component.html',
  styleUrls: [ './book-list.component.css' ]


})
export class BookListComponent implements OnInit, OnDestroy  {


 subscription: Subscription;
 public books: Book[];


  constructor(private bookService: BookService,
              private router: Router,
              private route: ActivatedRoute,
              public filterServ: FilterService,
             
              
              ) { }

  ngOnInit() {
  	this.subscription = this.bookService.booksChanged
  	.subscribe(
        (books: Book[]) => {
          this.books = books;
        }
      );
      
      this.books = this.bookService.getBooks();
 

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
 
 
}