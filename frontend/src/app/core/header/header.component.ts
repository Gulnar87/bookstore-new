import { Component, OnInit, Input, Output } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../../shared/data-storage.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { Book } from '../../shared/book.model';
import { AuthService } from '../../auth/auth.service';
import { faSearch, faPaste, faBook } from '@fortawesome/free-solid-svg-icons';
import { FilterService } from '../../shared/filter-service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

isCollapsed = false; 

books: Book[];

 subscription: Subscription; 
 // isCollapsed = false;
 id: number;
 book: Book; 
 total: number;

 faBook = faBook;
 faPaste = faPaste;



  constructor(private dataStorageService: DataStorageService, 
              private slService: ShoppingListService,
              public authService: AuthService,
              private filter: FilterService
            
             ) {
 
   }


   update (value) {
    this.filter.setFilter(value);
  }

  ngOnInit() {
  
     this.books = this.slService.getBooks();
     this.subscription = this.slService.booksChanged
      .subscribe(
        (books: Book[]) => {
          this.books = books;
        }
      );


         this.slService.calculateTotal
        .subscribe(
         (total) =>{
         this.total = total;
 
  });

this.slService.calculateTotalPrice();
    console.log(this.books.length);
    console.log('in header' + this.total);


console.log(this.books.length);	
}




onSaveData(){
  // this.dataStorageService.storeBooks()
   
  // .subscribe(
  // 	(response: Response) => {
  // 		console.log(response);
  // 	   }, (error) => console.log(error)
  // );

 this.dataStorageService.storeShoppinglist()
  .subscribe(
    (response: Response) => {
      console.log(response);
       }, (error) => console.log(error)
  );


}

onFetchData(){
  // this.dataStorageService.getBooks();
  // (error ) => console.log(error);

  // this.dataStorageService.getShoppingList();
  
}

 onLogout() {
    // this.authService.logout();
    this.authService.signOut();
  }

 
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

 

}
