import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private checkeddata = new BehaviorSubject<any[]>([]);
  checkedsubscribe = this.checkeddata.asObservable();

  private selectedadd = new BehaviorSubject<any>([]);
  optedadd = this.selectedadd.asObservable();

  constructor() {}
  sharedservice(data: any) {
    this.checkeddata.next(data);
  }
  orderaddress(add: any) {
    
    this.selectedadd.next(add);
  }

  paymentdetails(data: any) {
    console.log('orderreview', data);
  }
}
