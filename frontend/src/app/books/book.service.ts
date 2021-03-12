
import {  Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Book } from '../shared/book.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

import { AngularFireDatabase} from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { switchMap } from 'rxjs/operators';


@Injectable()
export class BookService {
  private booksChanged$: BehaviorSubject<Array<Book>> = new BehaviorSubject<Array<Book>>(null);
  booksChanged = new Subject<Book[]>();
	private	books:Book[] =[];

	constructor(private slService: ShoppingListService, 
              protected httpClient: HttpClient) {}


  getBooks(): Observable<Array<Book>>  {
    if (this.booksChanged$.getValue() === null) {
      return this.updateBooks();
    } else {
      return this.booksChanged$.asObservable();
    }
  }
  
  updateBooks(): Observable<Array<Book>> {
    return this.httpClient.get<Book[]>(environment.books)
      .pipe(
        switchMap(
          (vacancies: Array<Book>) => {
            this.booksChanged$.next(vacancies);
            return this.booksChanged$.asObservable()
          })
      );
  }


	getBook(bookId: number): Observable<Book> {
		const book = (environment.books) + 'details/' + bookId;
		return this.httpClient.get<Book>(book);
	  }


	createBook(book): Observable<Book>{
	  return this.httpClient.post<Book>(environment.books + 'add-book', book);
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