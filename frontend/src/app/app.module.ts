import { BrowserModule } from '@angular/platform-browser';
import { NgModule,  NO_ERRORS_SCHEMA  } from '@angular/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database'
// import { MaterialModule } from './material.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module'
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShortenPipe } from './shorten.pipe';

import { CollapseDirective } from './shared/collapse.directive';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { environment } from '../environments/environment';
import { ErrorPageComponent } from '../app/error-page/error-page.component';
import { BooksModule } from './books/books.module';
import { CarouselModule,  PopoverModule, ModalModule } from 'ngx-bootstrap';
import { BrowserTransferStateModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    AppComponent,   
    ShortenPipe,
    CollapseDirective,
    ErrorPageComponent,
  
     
  ],

  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    BrowserTransferStateModule,
    ShoppingListModule,
    BooksModule,
    AuthModule,
    CoreModule,
    HttpModule, 
    HttpClientModule,
    SharedModule,
    AngularFireAuthModule, 
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AppRoutingModule,

    NgbModule.forRoot(),
    CarouselModule.forRoot(),
      PopoverModule.forRoot(),
      ModalModule.forRoot(),
      
     // MaterialModule,
     // ModalModule.forRoot(),
     // MDBBootstrapModule.forRoot(),
 
  ],

    
  bootstrap: [AppComponent],

  schemas: [ NO_ERRORS_SCHEMA ]

})

export class AppModule { }






