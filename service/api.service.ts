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
export class ApiService {
  baseUri: string = 'http://localhost:4000/messenger';
  
  constructor(private http: HttpClient) {}

  // Create user
  createUser(data): Observable<any> {
    let url = `${this.baseUri}/user`;
    let token = sessionStorage.getItem('id_token').split(' ')[1];
    let headers = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer '+token);
    return this.http.post(url, data, { headers: headers }).pipe(catchError(this.errorMgmt));
  }
  // Get all users
  getUsers() {
    let url = `${this.baseUri}/user/list`;
    let token = sessionStorage.getItem('id_token').split(' ')[1];
    let headers = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer '+token);
    return this.http.get(url, { headers: headers });
  }
  // Delete user
    deleteUser(id): Observable<any> {
      let url = `${this.baseUri}/user/${id}`;
      let token = sessionStorage.getItem('id_token').split(' ')[1];
      let headers = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer '+token);
      return this.http
        .delete(url, { headers: headers })
        .pipe(catchError(this.errorMgmt));
    }
  // Get user
  getUser(id): Observable<any> {
    let url = `${this.baseUri}/user/${id}`;
    let token = sessionStorage.getItem('id_token').split(' ')[1];
    let headers = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer '+token);
    return this.http.get(url, { headers: headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }
  // Update user
  updateUser(id, data): Observable<any> {
    let url = `${this.baseUri}/user/${id}`;
    let token = sessionStorage.getItem('id_token').split(' ')[1];
    let headers = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer '+token);
    return this.http
      .put(url, data, { headers: headers })
      .pipe(catchError(this.errorMgmt));
  }

    // Send Message
    sendMessage(data): Observable<any> {
      let url = `${this.baseUri}/user/send-message`;
      let token = sessionStorage.getItem('id_token').split(' ')[1];
      let headers = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer '+token);
      return this.http.post(url, data,{ headers: headers }).pipe(catchError(this.errorMgmt));
    }

    // Get Inbox
    getInbox(username): Observable<any> {
      let url = `${this.baseUri}/user/${username}/inbox`;
      let token = sessionStorage.getItem('id_token').split(' ')[1];
      let headers = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer '+token);
      return this.http.get(url, { headers: headers }).pipe(
        map((res: Response) => {
          return res || {};
        }),
        catchError(this.errorMgmt)
      );
    }

    // Get Outbox
    getOutbox(username): Observable<any> {
      let url = `${this.baseUri}/user/${username}/outbox`;
      let token = sessionStorage.getItem('id_token').split(' ')[1];
      let headers = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer '+token);
      return this.http.get(url, { headers: headers }).pipe(
        map((res: Response) => {
          return res || {};
        }),
        catchError(this.errorMgmt)
      );
    }

    // Delete message
    deleteMessage(id): Observable<any> {
      let url = `${this.baseUri}/user/message/${id}`;
      let token = sessionStorage.getItem('id_token').split(' ')[1];
      let headers = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer '+token);
      return this.http
        .delete(url, { headers: headers })
        .pipe(catchError(this.errorMgmt));
    }

  // Create user log
  createUserLog(data): Observable<any> {
    let url = `${this.baseUri}/user-log`;
    let token = sessionStorage.getItem('id_token').split(' ')[1];
    let headers = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer '+token);
    return this.http.post(url, data, { headers: headers }).pipe(catchError(this.errorMgmt));
  }

  getUserLogs() {
    let url = `${this.baseUri}/user-log/list`;
    let token = sessionStorage.getItem('id_token').split(' ')[1];
    let headers = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer '+token);
    
    return this.http.get(url, { headers: headers });
  }

  /*  User logs with server pagination
    // Get user logs
    getUserLogs() {
      let url = `${this.baseUri}/user-log/list/${20}/${20}`;
      let token = sessionStorage.getItem('id_token').split(' ')[1];
      let headers = new HttpHeaders().set('Content-Type', 'application/json').append('Authorization', 'Bearer '+token);
      
      return this.http.get(url, { headers: headers });
    }
*/
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