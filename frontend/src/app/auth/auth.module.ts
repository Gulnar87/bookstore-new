import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from '../auth/signup/signup.component';
import { SigninComponent } from '../auth/signin/signin.component';
import { ForgotPasswordComponent } from '../auth/forgot-password/forgot-password.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
	declarations: [
	  SignupComponent,
      SigninComponent,
      ForgotPasswordComponent,
 
	], 

	imports: [
	 FormsModule,
	 CommonModule,
	 AuthRoutingModule, 
	 FontAwesomeModule

	]
})

export class AuthModule {}