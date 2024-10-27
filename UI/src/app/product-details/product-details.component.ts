import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any = null; 
  qt: number = 1;
  maxStock: number = 20; 

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.fetchProductDetails(id);
  }

  private fetchProductDetails(id: string): void {
    this.productService.getcarElement(id).subscribe(
      (res: any) => {
        if (res && res.data) {
          this.product = res.data;
          console.log(this.product);
        }
      },
      (error) => {
        alert("No data found with the mentioned ID.");
        this.router.navigate(['home']);
      }
    );
  }

  submit(action: string): void {
    if (action === 'a') {
      if (this.qt < this.maxStock) {
        this.qt++;
      } else {
        alert("Out of Stock");
      }
    } else if (action === 'm') {
      if (this.qt > 1) {
        this.qt--;
      } else {
        alert("Need to select at least one quantity.");
      }
    } else {
      const quantity = Number(action);
      if (!isNaN(quantity) && quantity >= 1 && quantity <= this.maxStock) {
        this.qt = quantity;
      } else {
        alert(`Quantity should be between 1 and ${this.maxStock}.`);
      }
    }
  }
addtocart(){

}
  // addtocart(): void {
  //   if (!this.product) {
  //     alert("Product details are not available.");
  //     return;
  //   }
  //   const cartItem = {
  //     productId: this.product._id,
  //     quantity: this.qt,
  //     price: this.product.price * this.qt
  //   };

  //   // Add to cart logic or call to cart service
  //   console.log("Added to cart:", cartItem);
  //   alert("Item added to cart successfully!");
  // }
}
