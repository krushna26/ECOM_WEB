import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentoptions=["UPI","Card","Cash on Delivery"];
  selectedpaymentoption:String='';
  constructor() { }

  ngOnInit(): void {

    
  }
  onSelectionChange(option:string){
    console.log(this.selectedpaymentoption);
    
    this.selectedpaymentoption=option;
  }
 
}
