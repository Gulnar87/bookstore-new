import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../service/auth.servise';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor{

  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler){

    let basicAuthHeaderString = this.authenticationService.getAuthenticatedTokeen()
    let username = this.authenticationService.getAuthenticatedUser()


    if(basicAuthHeaderString && username){
      request = request.clone({
        setHeaders : {
            Authorization : basicAuthHeaderString
          }
        }) 
    }

    return next.handle(request);
  }
}