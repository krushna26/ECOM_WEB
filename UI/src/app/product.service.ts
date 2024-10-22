import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // private apiUrl = "http://localhost:3000/user";
  private producturl="http://localhost:3000/product";

  constructor(private http:HttpClient) { }
  getcarElement(id:any):Observable<any>{
    return this.http.get(`${this.producturl}/${id}`)
  }

  addproduct(productdata:any){
      // This is used to for maintaining  the quantity of products and for adding of New products

  }


  viewallproduct():Observable<any>{
    return this.http.get<any>(`${this.producturl}`);
  }
}
