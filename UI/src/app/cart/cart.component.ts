import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartdata: any[] = []; 
  products: any[] = []; 
  isselected:boolean=false;
  selecteddata:any[]=[]
  constructor(
    private productService: ProductService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userData = this.userService.getdatafromToken();
    if (userData && userData.id) {
      this.userService.getdatabyid(userData.id).subscribe((res) => {
        if (res && res.data) {
          this.products = res.data.cartitems;      
          if (this.products.length > 0) {
            for (let i = 0; i < this.products.length; i++) {
              this.productService.getcarElement(this.products[i].productId).subscribe((cartItem) => {
                cartItem.data.quantity=this.products[i].quantity
                this.cartdata.push(cartItem.data); // Add cart element to cartdata              
              });
            }
          }
        }
      });

    }        
  }


  toggleselected(item: any,event:Event) { 
   
    const checkbox = event.target as HTMLInputElement; 
    if (checkbox.checked) {
      this.selecteddata.push(item);      
    } else {
      this.selecteddata = this.selecteddata.filter(i => i !== item);
    }
    this.productService.sharedservice(this.selecteddata);
    
  }

}
