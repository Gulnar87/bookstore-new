import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { faAt, faTimesCircle, faCheckCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
@ViewChild('f') forgotPasswordForm: NgForm;
resetPassword = false;
faAt = faAt;
faTimesCircle = faTimesCircle;
faCheckCircle = faCheckCircle; 


  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  sendResetEmail() {
  
    this.authService.resetPassword(this.forgotPasswordForm.value.email)
     // .then(() => {this.resetPassword = true})
     //  .catch((error) => {
     //    console.log(error)
        
     //  })    
  }


}
