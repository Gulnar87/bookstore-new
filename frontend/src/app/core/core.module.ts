import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { BookService } from '../books/book.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SwiperModule, SwiperConfigInterface,
  SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { CarouselModule,  PopoverModule, ModalModule } from 'ngx-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { BarRatingModule } from "ngx-bar-rating";
import { BooksModule } from '../books/books.module';
import { FilterService } from '../shared/filter-service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../interceptors/auth.interceptor';




const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  observer: true,
  direction: 'horizontal',
  threshold: 50,
  spaceBetween: 5,
  slidesPerView: 1,
  centeredSlides: true
};


@NgModule({
	declarations: [
	  HeaderComponent, 
      HomeComponent,
      FooterComponent,
	  ],

	imports: [
	  CommonModule,
	  AppRoutingModule,
	  MDBBootstrapModule.forRoot(),
	  NgbModule,
	  SwiperModule,       
	  // CarouselModule.forRoot(),
   //    PopoverModule.forRoot(),
   //    ModalModule.forRoot(),
   	  CarouselModule,
      PopoverModule,
      ModalModule,
      SharedModule,
      BarRatingModule,
      BooksModule,
      FontAwesomeModule
      
      
	], 

	exports: [
	 AppRoutingModule,
	 HeaderComponent, 
	 FooterComponent,

	],

	providers: [
	  BookService, 
	  ShoppingListService, 
	  DataStorageService, 
	  AuthService,
	  FilterService,
	   {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
	}, 
	{
		provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
	}
	],

	// schemas: [ NO_ERRORS_SCHEMA ]



})

export class CoreModule { }