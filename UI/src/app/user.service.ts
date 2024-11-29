import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/user';
  loginStatusChanged = new EventEmitter<boolean>();
  private cartSubject = new BehaviorSubject<number>(0);
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {}


  addcartnumber(a:number){
    this.cartSubject.next(a);
  }

  loginService(logindata: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<any>(`${this.apiUrl}/login`, logindata, { headers })
      .pipe(catchError(this.handleError));
  }

  signupservice(signupdata: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/register`, signupdata)
      .pipe(catchError(this.handleError));
  }

  logout(): void {
    localStorage.clear();
    localStorage.removeItem('token');
    this.loginStatusChanged.emit(false);
  }

  getdatafromToken(): any {
    const token = localStorage.getItem('token');
    return token ? jwtDecode(token) : null;
  }

  getdatabyid(id: string): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }


  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token !== null;
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }

  UpdateItemtoCart(cartItem: any): Observable<any> {  

    return this.http.patch(`${this.apiUrl}/updateProduct`, cartItem);
  }

  resetpassword(resetdata1:any){
    return this.http.patch(`${this.apiUrl}/forgot-password`,resetdata1)
  }

  updateuseraddress(newadd: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const userId = this.getdatafromToken().id;
    const url = `${this.apiUrl}/addnewaddress/${userId}`;
     this.http.patch(url, newadd, { headers }).subscribe((res=>{     

    }))
  }
  
  
}
