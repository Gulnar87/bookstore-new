import { NgModule, NO_ERRORS_SCHEMA  } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';
import { BarRatingModule } from "ngx-bar-rating";
import { BooksModule } from './../books/books.module';
import { FilterPipe } from '../shared/filter.pipe';
import { HighlightDirective } from './highlight.directive';




@NgModule ({
	declarations: [
	  DropdownDirective,
	  HighlightDirective,
	  FilterPipe
	 
	],

	imports: [

	// BarRatingModule
	],


	exports: [
	 CommonModule,
	 DropdownDirective,
	 HighlightDirective,
	 BarRatingModule,
	 FilterPipe,
	 FormsModule 
	 

	],

	 schemas: [ NO_ERRORS_SCHEMA ]

})


export class SharedModule {

}