import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { faAt, faUnlock, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';

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



 
constructor(public authService: AuthService) { }

onSignin(){
	console.log(this.signinForm);
	
	const email = this.signinForm.value.email; 
	const password = this.signinForm.value.password;
	this.signinForm.reset();
  this.authService.signinUser(email, password)
}

  ngOnInit() {
  }


}
