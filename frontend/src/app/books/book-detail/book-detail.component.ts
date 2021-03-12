import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../../shared/book.model';
import { BookService } from '../book.service';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { faShoppingCart, faShare, faCogs, faEdit, faTrashAlt, 
  faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

import { DataStorageService } from '../../shared/data-storage.service';


@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {


	  book: Book;
    isCollapsed = false;
    id: number;
    faShoppingCart = faShoppingCart;
    faShare = faShare;
    faCogs = faCogs;
    faEdit = faEdit;
    faTrashAlt = faTrashAlt;
    faCaretUp = faCaretUp;
    faCaretDown = faCaretDown;
  

  constructor(private bookService: BookService, 
    private slService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router,
    private dataStorageService: DataStorageService) { }


  ngOnInit() {

    this.route.params
      .subscribe((params: Params) => {
        this.id = params['id'];
        this.bookService.getBook(this.id).subscribe(book=> {
               this.book = book
              });
      });
  }


  onAddToShoppingList(){
  	this.bookService.addBookToShoppingList(this.book)
    this.onSaveShopping()

  }


   onEditBook() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

    onDeleteBook() {
    this.bookService.deleteBook(this.id);
    //  this.onSaveBooks()
    this.router.navigate(['/books']);

  }


//  onSaveBooks(){
//   this.dataStorageService.storeBooks()
   
//   .subscribe(
//     (response: Response) => {
//       console.log(response);
//        }, (error) => console.log(error)
//   );


  
//   }

onSaveShopping(){

 this.dataStorageService.storeShoppinglist()
  .subscribe(
    (response: Response) => {
      console.log(response);
       }, (error) => console.log(error)
  );


}



}
