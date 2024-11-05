import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../product.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: any = null;
  qt: number = 1;
  maxStock: number = 20;
  isloggedin: boolean = false;
  tokendata: string = '';
  userdatafromtoken: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.fetchProductDetails(id);
    this.userService.loginStatusChanged.subscribe((status: boolean) => {
      this.isloggedin = status;
    });
  }

  private fetchProductDetails(id: string): void {
    this.productService.getcarElement(id).subscribe(
      (res: any) => {
        if (res && res.data) {
          this.product = res.data;
        }
      },
      (error) => {
        alert('No data found with the mentioned ID.');
        this.router.navigate(['home']);
      }
    );
  }

  submit(action: string): void {
    if (action === 'a') {
      if (this.qt < this.maxStock) {
        this.qt++;
      } else {
        alert('Out of Stock');
      }
    } else if (action === 'm') {
      if (this.qt > 1) {
        this.qt--;
      } else {
        alert('Need to select at least one quantity.');
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

  addtocart(): void {
    if (!this.product) {
      alert('Product details are not available.');
      return;
    }

    this.userdatafromtoken = this.userService.getdatafromToken();
    console.log(this.userdatafromtoken);
    
    if (this.userdatafromtoken == null) {
      alert('Need to login');
      this.router.navigate(['/login']);
    } else {
      const cartItem = {
        userId: this.userdatafromtoken.id,
        productId: this.product._id,
        quantity: this.qt,
      };

      // console.log("Datafrom the Token and userid added to hthis",cartItem);
      this.userService.UpdateItemtoCart(cartItem).subscribe(
        (res: any) => {
          this.router.navigate(['/cart'])
          // console.log('Added to cart:', cartItem);
          // alert('Item added to cart successfully!');

        },
        (error) => {
          alert(error.error.msg);

        }
      );

     
    }
  }

  buy() {
    this.userdatafromtoken = this.userService.getdatafromToken();
    if (this.userdatafromtoken == null) {
      alert('Need to login');
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/buy']);
    }
  }
}
