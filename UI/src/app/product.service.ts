import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // private apiUrl = "http://localhost:3000/user";
  private producturl="http://localhost:3000/product";
  private checkeddata=new BehaviorSubject<any[]>([]);
   checkedsubscribe=this.checkeddata.asObservable();



  constructor(private http:HttpClient) { }

  sharedservice(data:any){
    this.checkeddata.next(data);

  }
  getcarElement(id:any):Observable<any>{
    return this.http.get(`${this.producturl}/${id}`)
  }

  viewallproduct():Observable<any>{
    return this.http.get<any>(`${this.producturl}`);
  }
}
