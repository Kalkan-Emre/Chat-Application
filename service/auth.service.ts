import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUri: string = 'http://localhost:4000/messenger';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  authToken: any;
  user: any;

  constructor(private http: HttpClient) {}

  authenticateUser(data):  Observable<any> {
    let url = `${this.baseUri}/user/login`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }

  storeUserData(token, user) {
    sessionStorage.setItem('id_token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = sessionStorage.getItem('id_token');
    this.authToken = token;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    sessionStorage.clear();
    
  }

  isAdmin(){
    let jsonObject = sessionStorage.getItem('user');
    let designation = JSON.parse(jsonObject)["designation"];
    if(designation=="admin") return true;
    else return false;
  }


    // Error handling
    errorMgmt(error: HttpErrorResponse) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(() => {
        return errorMessage;
      });
    }
}