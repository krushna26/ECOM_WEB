import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartdata: any[] = [];  // Initialize cartdata as an array
  products: any[] = [];  // Initialize products as an empty array
  cartcount: number = 0; // Set cartcount to 0 initially
  totalprice:number=0;

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
                this.cartdata.push(cartItem.data); // Add cart element to cartdata
                const p=Number(cartItem.data.price);
                const q=Number(this.products[i].quantity);

                
                
                this.totalprice+=(p*q)
                
              });
              this.cartcount += this.products[i].quantity; // Update cart count
            }
          }
        }
        localStorage.setItem('cartcount',String(this.cartcount))
      });
    }



    // for (var i=0;i<this.cartdata.length;i++){
    //   // console.log(this.cartdata[i]);
    //   let price=Number(this.cartdata[i].price);
    //   let qtt=Number(this.cartdata[i].quantity);
    //   this.totalprice+=(price*qtt);
    // }

    // console.log("Total Price",this.totalprice);
    
    
    
  }


}
