import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-summery',
  templateUrl: './summery.component.html',
  styleUrls: ['./summery.component.css'],
})
export class SummeryComponent implements OnInit {
  quantity: number = 0;
  total_amount: number = 0;
  selcteddata:any[]=[];
  SGST_Price: number=0;
  CGST_Price: number=0;

  constructor(private productservice: ProductService,private orderService:OrderService, private router:Router) {}

  ngOnInit(): void {
    this.orderService.checkedsubscribe.subscribe((res: any) => {
      this.selcteddata=res;
      let a = 0;
      let b = 0;
      for (let i of res) {
        a += i.quantity;
        const c = i.price;
        b += c * i.quantity;
      }
      this.quantity = a;
      this.total_amount = b;

    });
    
  }
  navigatetocheckout(s:any[]){
    this.router.navigate(["/checkout"])

  }
}
