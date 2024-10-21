import { Component, OnInit } from '@angular/core';
// import { CartserviceService } from '../cartservice.service';
import { UserService } from '../user.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartdata: any;
  products: any;
  cartcount: number = 10;
  constructor(
    private productService: ProductService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userData = this.userService.getdatafromToken();
    if (userData && userData.id) {
      this.userService.getdatabyid(userData.id).subscribe((res) => {
        if (res && res.data) {
          this.products = res.data.cartItems;
        }
      });
    }

    if (this.products.length != 0) {
      for (var i = 0; i < this.products.length; i++) {
        this.cartdata.push(this.productService.getcarElement(this.products[i].objectId));
        this.cartcount += this.products[i].quantity;
      }
    }

    localStorage.setItem('cartcount',String(this.cartcount))
  }
}
