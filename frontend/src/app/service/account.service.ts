import {Inject, Injectable, Optional} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {environment} from 'src/environments/environment';

import {map, switchMap} from 'rxjs/operators';
import { User } from '../shared/user.model';
import { AuthenticationService } from './auth.servise';

export const API_URL = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  /**
   * Buffered match object.
   */
  public match: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * Buffered user object.
   */
  public user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  /**
   * Buffered all users object.
   */
  private users: BehaviorSubject<Array<User>> = new BehaviorSubject<Array<User>>(null);

  /**
   * Inject services.
   */
  constructor(private http: HttpClient,
              private authServerProvider: AuthenticationService,
              @Optional() @Inject('serverUrl') protected serverUrl: string) {
    this.serverUrl = serverUrl ? serverUrl : '';
  }

  /**
   * Check if there is a buffered user object.
   */
//   isLoggedIn() {
//     return !this.user.getValue();
//   }

  /**
   * Get user checking if user is buffered, otherwise returning HTTP call.
   */
  getUser(): Observable<User> {
    if (this.user.getValue() === null) {
      return this.updateUser();
    } else {
      return this.user.asObservable();
    }
  }

  /**
   * Force the user behaviour subject to update, if token is available.
   */
  updateUser(): Observable<User> {
    const token = this.authServerProvider.getToken();
    if (token) {
      return this.http.get<User>(`${API_URL}/webresources/acccount`).pipe(
        switchMap(
          (user) => {
            this.user.next(user);
            return this.user.asObservable();
          }
        )
      );
    } else {
      return of(null);
    }
  }




  /* for admin to manually activate unverified accounts*/


//   getUsers(): Observable<Array<UserOverview>> {
//     if (this.users.getValue() === null) {
//       return this.updateUsers();
//     } else {
//       return this.users.asObservable();
//     }
//   }







//   updateUsers(): Observable<Array<UserOverview>> {
//     return this.http.get<Array<UserOverview>>(this.serverUrl + environment.accountServiceUrl + 'all-users')
//       .pipe(
//         switchMap(
//           (users) => {
//             this.users.next(users);
//             return this.users.asObservable();
//           }
//         )
//       );
//   }







}
