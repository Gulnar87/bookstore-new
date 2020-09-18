import { Book } from '../shared/book.model';
import { Input } from '@angular/core';
import {  Injectable } from '@angular/core';
import { Subject } from 'rxjs';


export class ShoppingListService {
  booksChanged = new Subject<Book[]>();
  startedEditing = new Subject<number>();
  calculateTotal = new Subject<number>();

   
  @Input() book: Book; 


  private  books: Book[] =[
  // new Book('A Farewell to Arms', 'Ernest Hemingway', 'https://img1.od-cdn.com/ImageType-400/0293-1/A09/1E6/08/%7BA091E608-0129-4DF3-BBA7-BC2CE94912D7%7DImg400.jpg', 
  //   'The best American novel to emerge from World War I, A Farewell to Arms is the unforgettable story of an American ambulance driver on the Italian front and his passion for a beautiful English nurse. ', 16, 'Gulnar', 558616100, 'gulnar_mammadova@yahoo.com', 'Baku' ),
  //   new Book('All Quiet on Western Front', 'Eric Maria Remarque', 'https://img1.od-cdn.com/ImageType-400/0111-1/31D/98C/97/%7B31D98C97-5CFB-4B87-A0FD-B218B2C14F19%7DImg400.jpg', 
  //   'The book describes the German soldiers\' extreme physical and mental stress during the war, and the detachment from civilian life felt by many of these soldiers upon returning home from the front. ', 16, 'Farida', 558616100, 'gulnar_mammadova@yahoo.com', 'Ganja'),
  //   new Book('A Farewell to Arms', 'Ernest Hemingway', 'https://img1.od-cdn.com/ImageType-400/0293-1/A09/1E6/08/%7BA091E608-0129-4DF3-BBA7-BC2CE94912D7%7DImg400.jpg', 
  //   'The best American novel to emerge from World War I, A Farewell to Arms is the unforgettable story of an American ambulance driver on the Italian front and his passion for a beautiful English nurse. ', 16, 'Gulnar', 558616100, 'gulnar_mammadova@yahoo.com', 'Baku' ),
  //   new Book('All Quiet on Western Front', 'Eric Maria Remarque', 'https://img1.od-cdn.com/ImageType-400/0111-1/31D/98C/97/%7B31D98C97-5CFB-4B87-A0FD-B218B2C14F19%7DImg400.jpg', 
  //   'The book describes the German soldiers\' extreme physical and mental stress during the war, and the detachment from civilian life felt by many of these soldiers upon returning home from the front. ', 16, 'Farida', 558616100, 'gulnar_mammadova@yahoo.com', 'Ganja')
  ];


  getBooks() {

    return this.books.slice();
  }

 getBook(index: number){
   return this.books[index];
 }

  setBooks(books: Book[]){
    this.books = books;
    this.booksChanged.next(this.books.slice()); 
    this.calculateTotal.next(this.books.reduce((sum, item) => sum + item.price, 0));

  }

  addBook(book: Book) {
    this.books.push(book);
  
    this.booksChanged.next(this.books.slice()); 
    this.calculateTotal.next(this.books.reduce((sum, item) => sum + item.price, 0));
  }

    addBooks(books: Book[]) {

     this.books.push(...books);
      this.booksChanged.next(this.books.slice()); 
      this.calculateTotal.next(this.books.reduce((sum, item) => sum + item.price, 0));
  }

    deleteBook(index: number) {
      this.startedEditing.next(index);
      this.books.splice(index, 1);
      this.booksChanged.next(this.books.slice()); 
      this.calculateTotal.next(this.books.reduce((sum, item) => sum + item.price, 0));
      
  }

 calculateTotalPrice(){
 this.calculateTotal.next(this.books.reduce((sum, item) => sum + item.price, 0))
   // this.booksChanged.next(this.books.slice()); 

      
}



}