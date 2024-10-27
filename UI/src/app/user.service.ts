import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/user'; // Base URL for the API

  // EventEmitter to track login status
  loginStatusChanged = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {}

  loginService(logindata: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.apiUrl}/login`, logindata, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  signupservice(signupdata: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, signupdata)
      .pipe(
        catchError(this.handleError) 
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loginStatusChanged.emit(false); 
  }

  getdatafromToken(): any {
    const token = localStorage.getItem('token');
    return token ? jwtDecode(token) : null;
  }

  getdatabyid(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError) 
      );
  }

  // Check if user is authenticated based on token presence
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token !== null; 
  }

  // Handle errors from HTTP requests
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error); 
    return throwError(error);
  }
}
