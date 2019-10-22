import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { tap } from 'rxjs/operators';


@Injectable()
export class AppService {

  constructor() {
  }

  isLoggedIn() {
    return localStorage.getItem('currentUser') ? true : false;
  }

  login(email: string, password: string): Observable<boolean> {

// if email is valid (matches regex) and password length > 0
    let user= {
      'email': email,
      'password': password
    }
    localStorage.setItem('currentUser', JSON.stringify(user));
    return Observable.of(true);
  }
// removes the current user from local storage when user logout
  logout() {
    /*
      HERE YOU NEED TO MAKE A CALL TO YOUR API TO INVALIDATE THE USER'S AUTHENTICATION TOKEN.
    */
    localStorage.removeItem('currentUser');
  }

}
