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

          // Process cart items after data is fetched
          if (this.products.length > 0) {
            for (let i = 0; i < this.products.length; i++) {
              this.productService.getcarElement(this.products[i].objectId).subscribe((cartItem) => {
                this.cartdata.push(cartItem); // Add cart element to cartdata
              });
              this.cartcount += this.products[i].quantity; // Update cart count
            }
          }

          // Store cart count in local storage
          localStorage.setItem('cartcount', String(this.cartcount));
        }
      });
    }
  }
}
