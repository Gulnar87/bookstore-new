import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';

import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../shared/user.model';


export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticaterUser'
export const API_URL = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private http: HttpClient,  @Inject(PLATFORM_ID) private platformId: Object) { }

  executeJWTAuthenticationService(username, password) {
    return this.http.post<any>(
      `${API_URL}/authenticate`, {username, password}).pipe(
        map(
          data => {
            sessionStorage.setItem(AUTHENTICATED_USER, username);
            sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
            return data;
          }
        )
      )
  }

  login(credentials): Observable<any> {
    console.log(credentials, "credentials")
    const data = {
      username: credentials.username,
      password: credentials.password,
      rememberMe: credentials.rememberMe
    };
    return this.http.post(`${API_URL}/api/authenticate`, data, {observe: 'response'}).pipe(map(authenticateSuccess.bind(this)));

    function authenticateSuccess(resp) {
      const bearerToken = resp.headers.get('Authorization');
      if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
        const jwt = bearerToken.slice(7, bearerToken.length);
        this.storeAuthenticationToken(jwt, credentials.rememberMe);
        return jwt;
      }
    }
  }


  storeAuthenticationToken(jwt, rememberMe) {
    if (isPlatformBrowser(this.platformId)) {
      if (rememberMe) {
        localStorage.setItem('authenticationToken', jwt);
      } else {
        sessionStorage.setItem('authenticationToken', jwt);
      }
    }
  }

  getToken() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('authenticationToken') || sessionStorage.getItem('authenticationToken');
    }
  }

  verifyToken()  {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const payLoad = JSON.parse(atob(token.split('.')[1]));
    return Date.now() < payLoad.exp * 1000;
  }

  register(account: User): Promise<string> {
    return this.http.post( `${API_URL}/api/register`, account).toPromise().then(() => {
      console.log(account, "account")
      return 'success';
    }).catch(err => {
      if (err.error.errorKey === 'userexists') {
        return 'user_exists';
      } else if (err.error.errorKey === 'noCompany') {
        return 'no_company';
      } else if (err.error.errorKey === 'EmailAddressAlreadyUsedForCC') {
        return 'email_address_already_used';
      } else {
        return 'failure';
      }
    });
  }

  getAuthenticatedUser(){
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

 getAuthenticatedTokeen(){
   if(this.getAuthenticatedUser()){
   return sessionStorage.getItem(TOKEN)
   }
 }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER)
    return !(user === null)
  }

  logout(){
    sessionStorage.removeItem(AUTHENTICATED_USER)
    sessionStorage.removeItem(TOKEN)
  }





}