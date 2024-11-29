import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  paymentoptions = ['UPI', 'Card', 'Cash on Delivery'];
  selectedpaymentoption: String = '';
  upiId: string = '';
  selectedOption: string = 'credit card';
  quantity: number = 0;
  total_amount: number = 0;
  delivery_charges: number = 50;
  SGST_Price: number = 0;
  CGST_Price: number = 0;
  orderdata: any;
  add: any;
  userId:any;
  constructor(private orderService: OrderService,private userService:UserService) {}

  ngOnInit(): void {
   const as=this.userService.getdatafromToken();
   this.userId=as.id
    this.orderService.checkedsubscribe.subscribe((res: any) => {
      this.orderdata = res;

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

    if (this.total_amount > 500) {
      this.delivery_charges = 0;
    }

    this.SGST_Price = this.total_amount * 0.05;
    this.CGST_Price = this.total_amount * 0.05;

    this.total_amount =
      this.total_amount +
      this.SGST_Price +
      this.CGST_Price +
      this.delivery_charges;

      this.orderService.optedadd.subscribe((res1:any) => {       
        this.add = res1;
      });
  }
  onSelectionChange(option: string) {
    this.selectedpaymentoption = option;
  }

  upi_payment(details: string) {
    const payment_Mode = 'UPI';
    const payment_details={
      payment_Mode:payment_Mode,
      details:details
    }
    const orderreview = {
      usr_id:this.userId,
      items: this.orderdata,
      add: this.add,
      payementdetails: payment_details,
    };
    this.orderService.paymentdetails(orderreview);
  }
  card_payment(details: any) {
    const payment_Mode = 'card Payment';
    const payment_details={
      payment_Mode:payment_Mode,
      details:details
    }
    const orderreview = {
      usr_id:this.userId,
      items: this.orderdata,
      add: this.add,
      payementdetails: payment_details,
    };
    this.orderService.paymentdetails(orderreview);
  }

  cashondelivery() {
    const payment_Mode = 'cash on delivery';

    const payment_details = {
      payment_Mode,
    };
    const orderreview = {
      usr_id:this.userId,
      items: this.orderdata,
      add: this.add,
      payementdetails: payment_details,
    };

    this.orderService.paymentdetails(orderreview);
  }
}
