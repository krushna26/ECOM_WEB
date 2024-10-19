import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  data:any;

  private apiUrl = "http://localhost:3000/user"; // Base URL for the API
  
  // EventEmitter to notify other components about login status changes
  loginStatusChanged = new EventEmitter<boolean>();

  constructor(private http: HttpClient) { }

  loginService(logindata: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Return the observable, don't subscribe here
    return this.http.post<any>(`${this.apiUrl}/login`, logindata, { headers });
  }

  signupservice(signupdata: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, signupdata);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loginStatusChanged.emit(false); // Emit logout status change
  }
  getdatafromToken():void{
    const tkn=localStorage.getItem('token');
    if(tkn){
    return jwtDecode(tkn)
    }


  }
}
