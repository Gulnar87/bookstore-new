import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { faAt, faUnlock, faUser, faExclamationTriangle, faImage} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;

  faAt = faAt;
  faUnlock = faUnlock;
  faUser = faUser;
  faExclamationTriangle = faExclamationTriangle;
  faImage = faImage;


  constructor(public authService: AuthService) { }

  ngOnInit() {


  	 	
  }

 onSignup(){
   console.log(this.signupForm);
    const displayName = this.signupForm.value.name;
	  const email = this.signupForm.value.email; 
	  const password = this.signupForm.value.password;
    const imagePath = this.signupForm.value.imagePath;
    // this.signupForm.reset();
     this.authService.signupUser(email, password, displayName, imagePath);


 }

 
}
