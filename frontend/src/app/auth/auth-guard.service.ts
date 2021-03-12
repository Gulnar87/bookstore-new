import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AuthenticationService } from '../service/auth.servise';


@Injectable()

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, 
  	         private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  

if(this.authService.isUserLoggedIn()){
	return true; 
} else {
     this.router.navigate(['/signin']);
    return false;
}


  }



}