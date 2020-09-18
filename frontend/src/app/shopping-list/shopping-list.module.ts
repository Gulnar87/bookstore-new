import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
	declarations: [
	  ShoppingListComponent,
      ShoppingEditComponent,
	],

	imports: [
	  CommonModule,
	  MDBBootstrapModule.forRoot(),
	  SharedModule,
	  FontAwesomeModule
	]

})

export class ShoppingListModule {

}