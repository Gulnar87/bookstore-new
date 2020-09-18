import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { AuthGuard } from '../auth/auth-guard.service';

const bookRoutes: Routes = [
 {path: 'books', component: BooksComponent,  children: [
    { path: '', component: BookListComponent },
    { path: 'new', component: BookEditComponent},
    {path: ':id', component: BookDetailComponent },
    { path: ':id/edit', component: BookEditComponent }  
   ]},
];


@NgModule({
	imports: [
	  RouterModule.forChild(bookRoutes)
	],
	exports: [
	  RouterModule,

	],

	 providers: [
      AuthGuard
  ]

})
export class BooksRoutingModule {

}