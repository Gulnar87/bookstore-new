import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { HomeComponent } from './core/home/home.component';
import { AuthGuard } from './auth/auth-guard.service';
import { ErrorPageComponent } from '../app/error-page/error-page.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent },
  { path: 'home/:id', component: BookDetailComponent},

  // { path: 'books', loadChildren: './books/books.module#BooksModule'},
  {path: 'shopping-list', component: ShoppingListComponent },
  { path: 'shopping-list/:id', component: BookDetailComponent },

  


   // { path: ':id/edit', component: BookEditComponent, canActivate: [AuthGuard] },

 
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: '/not-found' }

];

@NgModule({
	imports: [
	RouterModule.forRoot(appRoutes),
	
	],
	exports: [RouterModule],

  providers: [
      AuthGuard
  ]

})
export class AppRoutingModule {

}




