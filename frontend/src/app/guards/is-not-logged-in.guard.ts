import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {map} from 'rxjs/operators';
import { AuthenticationService } from '../service/auth.servise';

@Injectable()
export class IsNotLoggedInGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  /**
   * Check if we can fetch user, if we can we are logged in.
   */
  canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
 

          if (this.authenticationService.getAuthenticatedTokeen()) {
            this.router.navigate(['/books']);
     
         
          }  else {

            return true;
          }

  }
}
