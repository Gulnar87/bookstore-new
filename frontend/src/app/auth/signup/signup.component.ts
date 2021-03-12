import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { faAt, faUnlock, faUser, faExclamationTriangle, faImage} from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/service/auth.servise';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('registerForm') registerForm: FormGroup;
  faAt = faAt;
  faUnlock = faUnlock;
  faUser = faUser;
  faExclamationTriangle = faExclamationTriangle;
  faImage = faImage;

  public user: User;


  constructor(public authService: AuthenticationService) { }

  ngOnInit() {


    this.user = new User();
  	 	
  }

//  onSignup(){
//   //  console.log(this.signupForm);
//   //   const displayName = this.signupForm.value.name;
// 	//   const email = this.signupForm.value.email; 
// 	//   const password = this.signupForm.value.password;
//   //   const imagePath = this.signupForm.value.imagePath;

  
//     // this.signupForm.reset();
//     //  this.authService.signupUser(email, password, displayName, imagePath);


//  }

 onSignup() {
 

  this.authService.register(this.user).then(res => {
    console.log(this.user, "my user")

    if (res === 'success') {
      this.registerForm.reset();
      this.user = new User();
    }
  });
}

 
}
