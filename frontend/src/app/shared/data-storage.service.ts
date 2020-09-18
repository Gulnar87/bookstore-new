import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BookService } from '../books/book.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Book } from '../shared/book.model';
import { AuthService } from '../auth/auth.service';

@Injectable()

export class DataStorageService {
	constructor(private bookService: BookService,
		        private shoppinglist: ShoppingListService,
		        private authService: AuthService,
		        protected httpClient: HttpClient){}

	  get(): Observable<Book[]> {
		return this.httpClient.get<Book[]>(environment.books);
		
	}



     getShopList(): Observable<Book[]> {
        return this.httpClient.get<Book[]>(environment.apiUrlShop);
    }


	storeBooks(){

		const token = this.authService.getToken();
		// const headers = new Headers({'Content-Type': 'application/json'});
		return this.httpClient.put('https://book-shop-app.firebaseio.com/books.json', 
			this.bookService.getBooks());

	
	}

	storeShoppinglist(){
	    const token = this.authService.getToken();
		return this.httpClient.put('https://book-shop-app.firebaseio.com/shoppingList.json', 
			this.shoppinglist.getBooks());


	}



	// getBooks(){

	// 	const token = this.authService.getToken();

	// 	this.http.get('https://book-shop-app.firebaseio.com/books.json?auth=' + token)
	// 	 .pipe(map(
	// 	 	(response: Response) => {
	// 	 		const books: Book[] = response.json();
	// 	 		console.log(response);
		 		
	// 	 		return books;
	// 	 	}
	// 	 	))

 //           .pipe(catchError((error: Response)=> {
 //           	 return throwError('Something went wrong');

 //           }

 //           ))

	// 	 .subscribe(
	// 	 	(books: Book[])=> { 
	// 	 		this.bookService.setBooks(books);

	// 	 	  }
	// 	 	);
	// }



 //    getShoppingList(){

 //    		const token = this.authService.getToken();
 //    	this.http.get('https://book-shop-app.firebaseio.com/books.json?auth=' + token)
	// 	 .pipe(map(
	// 	 	(response: Response) => {
	// 	 		const books: Book[] = response.json();
	// 	 		console.log(response);
		 	
	// 	 		return books;
	// 	 	}
	// 	 	))

	// 	 .subscribe(
	// 	 	(books: Book[])=> { 
	// 	 		this.shoppinglist.setBooks(books);

	// 	 	  }
	// 	 	);
	// }

    

}