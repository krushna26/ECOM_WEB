import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private checkeddata=new BehaviorSubject<any[]>([]);
  checkedsubscribe=this.checkeddata.asObservable();

  order:any;
  selected_add:any;

  constructor() { }
  sharedservice(data:any){
    this.checkeddata.next(data);
    this.order=data
  }
  orderaddress(add:any){
    this.selected_add=add
    
  }
}
