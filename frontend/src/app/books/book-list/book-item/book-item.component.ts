import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Book } from '../../../shared/book.model';
import { BookService } from '../../book.service';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { BarRatingModule } from "ngx-bar-rating";
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

import { Response } from '@angular/http';
import { DataStorageService } from '../../../shared/data-storage.service';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit {
   @Input() book: Book; 
   @Input() index: number;
   faCartPlus = faCartPlus;
  


  faRate = 4.6;


 constructor(private bookService: BookService,   
   private dataStorageService: DataStorageService) {

    }


  onAddToShoppingList(){
  	this.bookService.addBookToShoppingList(this.book)
       this.onSaveData()
  
  
  }

 
 onSaveData(){
 this.dataStorageService.storeShoppinglist()
  .subscribe(
    (response: Response) => {
      console.log(response);
       }, (error) => console.log(error)
  );

}

  ngOnInit() {
  	// fontawesome.library.add(faStar);
	
}
}
