import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
import { Book } from '../../shared/book.model';
import { BookService } from '../../books/book.service';
import { AuthService } from '../../auth/auth.service';
import { FilterService } from '../../shared/filter-service';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
   moduleId: 'src/app/app.component',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  faCheckCircle = faCheckCircle;

   imagess = [1, 2, 3].map(() => `https://picsum.photos/4000/600?random&t=${Math.random()}`);

  images: Array<string>;

  constructor(private bookService: BookService, 
             public authService: AuthService,
             private filterServ: FilterService) { }

 @ViewChild(SwiperComponent) componentRef?: SwiperComponent;
 @ViewChild(SwiperDirective) directiveRef?: SwiperDirective;


 subscription: Subscription;
 public books: Book[] ;
     
    @Input() index: number;
 

    ngOnInit() {

      this.bookService.getBooks()
      .subscribe(
          (books: Book[]) => {
              this.books = books
               // this.slService.setBooks(this.books);
              //  this.bookService.setBooks(this.books);
          },
          (error: HttpErrorResponse) => console.log(error)
      );
    
  }



   public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 4,
     // loop: true,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: true,
    spaceBetween: 5,
    grabCursor: true,
    centeredSlides: false,

     breakpoints: {
        991: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        767: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        575: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        479: {
          slidesPerView: 1,
        
         
        }
      }

  };


  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination', 
    clickable: true,
    hideOnClick: false,

     
  };

    private navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        
      }; 

  

}



 




 
 
 