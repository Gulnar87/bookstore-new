import { Component, OnInit } from '@angular/core';




import { Book } from './shared/book.model';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { Subscription } from 'rxjs';

import { BookService } from './books/book.service';



import { HttpErrorResponse } from '@angular/common/http';

import { DataStorageService } from './shared/data-storage.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'App';
book: Book; 
books: Book[];
shopbooks: Book[];

  constructor(private slService: ShoppingListService,    
              private dataStorageService: DataStorageService) { 
 }

  ngOnInit() {
       
             this.dataStorageService.getShopList()
            .subscribe(
                (response: Book[]) => {
                    this.shopbooks = response
                     this.slService.setBooks(this.shopbooks);
               
                    // console.log(response)
                 
                },
                (error: HttpErrorResponse) => console.log(error)
            );
  }

   

}


