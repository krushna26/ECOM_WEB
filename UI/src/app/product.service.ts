import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = "http://localhost:3000/user";

  constructor(private http:HttpClient) { }
  getcarElement(id:any){
    return this.http.get(`${this.apiUrl}/${id}`)
  }

  addproduct(productdata:any){

  }
  // This is used to for maintaining  the quantity of products and for adding of New products
}
