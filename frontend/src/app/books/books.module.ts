import { NgModule, NO_ERRORS_SCHEMA  } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';

import { BooksComponent } from './books.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookItemComponent } from './book-list/book-item/book-item.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { SharedModule } from '../shared/shared.module';
import { BarRatingModule } from "ngx-bar-rating";
import { MDBBootstrapModule } from 'angular-bootstrap-md';
// import { MaterialModule } from '../material.module';
import { PopoverModule } from 'ngx-bootstrap';
// import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';






@NgModule({
	declarations: [
	   BooksComponent,
     BookListComponent,
     BookItemComponent,
     BookDetailComponent,
     BookEditComponent,
	],

	imports: [
	  CommonModule,
    ReactiveFormsModule,
    SharedModule,
    BarRatingModule,
    MDBBootstrapModule.forRoot(),
    PopoverModule,
    BooksRoutingModule,
    FontAwesomeModule

	],

  exports: [
   BookItemComponent,
  ],

  schemas: [ NO_ERRORS_SCHEMA ]

})

export class BooksModule {

}