import { Component, ViewChild, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from '../../shared/book.model';
import { BookService } from '../book.service';
import { FilterService } from '../../shared/filter-service';
import { HttpErrorResponse } from '@angular/common/http';



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
              public filterServ: FilterService, 
              ) { }

  ngOnInit() {

    this.bookService.getBooks()
    .subscribe(
        (books: Book[]) => {
            this.books = books
             // this.slService.setBooks(this.books);
            //  this.bookService.setBooks(this.books);
        },
        (error: HttpErrorResponse) => console.log(error)
    );

 

  }

  ngOnDestroy(){
    // this.subscription.unsubscribe();
  }
 
 
}