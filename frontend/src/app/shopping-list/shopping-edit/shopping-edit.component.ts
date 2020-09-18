import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from '../../shared/book.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Book;
  book: Book; 

  constructor(private slService: ShoppingListService,
              private router: Router,
              private route: ActivatedRoute) { 
 }


  ngOnInit() {

  	   // this.subscription = this.slService.startedEditing
      //   .subscribe(
      //   (index: number) => {
      //     this.editedItemIndex = index;
      //     this.editMode = true;
      //     this.editedItem = this.slService.getBook(index);
         
          
      //   }
      // );


  }

   // onRemove(){
   //   this.slService.deleteBook(this.editedItemIndex);
   //   console.log(this.editedItemIndex);
   //   console.log(this.editedItem);

   // }

   ngOnDestroy(){
    // this.subscription.unsubscribe();
   }


}
