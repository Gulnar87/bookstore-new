import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../shared/book.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import { BookService } from './../books/book.service';
import { FilterService } from '../shared/filter-service';
import { faTags } from '@fortawesome/free-solid-svg-icons';

import { HttpErrorResponse } from '@angular/common/http';

import { DataStorageService } from '../shared/data-storage.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {


startedEditing = new Subject<number>();
book: Book; 
books: Book[];
 i: number;

sum: string; 
total: number;

 subscription: Subscription; 
 editedItemIndex: number;
 faTags = faTags; 



  constructor(private slService: ShoppingListService,
              private router: Router,
              private route: ActivatedRoute,
              private bookService: BookService,
              public filterServ: FilterService,
              private dataStorageService: DataStorageService ) { 
 }

  
   ngOnInit() {

 
    this.books = this.slService.getBooks();
     this.subscription = this.slService.booksChanged
      .subscribe(
        (books: Book[]) => {
          this.books = books;


        }
      );



      this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;    

        
        }
        );

    
       this.slService.calculateTotal
        .subscribe(
         (total) =>{
         this.total = total;

 
  });


this.slService.calculateTotalPrice();
 console.log('this total cost ' + this.total);

   }


 onSaveShopping(){
 this.dataStorageService.storeShoppinglist()
  .subscribe(
    (response: Response) => {
      console.log(response);
       }, (error) => console.log(error)
  );

}


  onRemove(index: number){
  
     this.slService.deleteBook(index);  
     this. onSaveShopping()
      // console.log('this total cost ' + this.total);


   }


   ngOnDestroy(){
    this.subscription.unsubscribe();
   }

   // onReadMore(){
   //   // this.router.navigate(['books', 'id'] ); 

   // }

}
