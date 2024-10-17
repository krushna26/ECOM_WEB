import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = "http://localhost:3000/user"; // Base URL for the API

  constructor(private http: HttpClient) { }

  loginService(logindata: any) {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'  // Correct Content-Type
    });

    return this.http.post<any>(`${this.apiUrl}/login`, logindata, { headers });
  }
}
