import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentoptions=["UPI","Card","Cash on Delivery"];
  selectedpaymentoption:String='';
  upiId: string = '';
  selectedOption:string="credit card"
  constructor() { }

  ngOnInit(): void {    
  }
  onSelectionChange(option:string){
    console.log(this.selectedpaymentoption);
    this.selectedpaymentoption=option;
  }

  upi_payment(upi:string){
    
    console.log(upi);
    

  }


  card_payment(details:any){
    console.log(details);
    
  }
 
}
