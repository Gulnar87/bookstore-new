import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { faAt, faUnlock, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { AuthenticationService } from 'src/app/service/auth.servise';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/shared/credentials.model';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

@ViewChild('f') signinForm: NgForm;

faAt = faAt;
faUnlock = faUnlock;
faFacebookF = faFacebookF;
faGoogle = faGoogle;
faTimesCircle = faTimesCircle;

public username: string;
public password: string;
errorMessage = 'Invalid Credentials'
invalidLogin = false
public loginStatus = 'none';
private redirectTo: string;

 
constructor(public authService: AuthenticationService, private router: Router,    private accountService: AccountService) { }

// onSignin(){
// 	console.log(this.signinForm);
	
// 	const email = this.signinForm.value.email; 
// 	const password = this.signinForm.value.password;
// 	this.signinForm.reset();
//   this.authService.signinUser(email, password)
// }


login() {
  this.authService.login(new Credentials(this.signinForm.value.email, this.signinForm.value.password)).subscribe((success: boolean) => {
    console.log(this.username, "username")
    console.log(success, "status success")
    if (success) {
      this.loginStatus = 'success';
console.log(this.loginStatus, "login status")
      this.accountService.getUser().subscribe(
        account => {
          console.log(account, "account")

          // if (!account.complete) {
          //   this.redirectTo = '/register';
          // }

          if (!this.redirectTo) {
     
              this.redirectTo = '/books';
            
          }

          this.router.navigateByUrl(this.redirectTo);
        }
      );
    }
  }, (error) => {
    if (error.error.detail && error.error.detail.includes('not activated')) {
      this.loginStatus = 'activation';
    } else if (error.error.detail && error.error.detail.includes('bad credentials')) {
      this.loginStatus = 'credentials';
    } else {
      this.loginStatus = 'failure';
    }
  });

}



  ngOnInit() {
  }


}
