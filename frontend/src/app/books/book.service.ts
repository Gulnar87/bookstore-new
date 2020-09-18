
import {  Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../shared/book.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

import { AngularFireDatabase} from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable()
export class BookService {
   booksChanged = new Subject<Book[]>();
   
    
	private	books:Book[] =[];

	constructor(private slService: ShoppingListService, 
              private db: AngularFireDatabase, 
              private afAuth: AngularFireAuth,
              protected httpClient: HttpClient
             ) {

  }



  getBooks(){
  	return this.books.slice();
  }

  getBook(index: number){
    return this.books[index];
  }


	getBookDetails(bookId): Observable<Book> {
		const book = (environment.books) + 'details/' + bookId;
		return this.httpClient.get<Book>(book);
	  }


  setBooks(books: Book[]){
    this.books = books;
    this.booksChanged.next(this.books.slice());

  }
  
  addBookToShoppingList(book: Book){
  	this.slService.addBook(book);
    // this.booksChanged.next(this.books.slice()); 

  }

  addBook(book: Book){
    this.books.push(book);
    this.booksChanged.next(this.books.slice()); 
  }

   updateBook(index: number, newBook: Book) {
    this.books[index] = newBook;
    this.booksChanged.next(this.books.slice());
  }

   deleteBook (index: number) {
    this.books.splice(index, 1);
    this.booksChanged.next(this.books.slice());
  }
}