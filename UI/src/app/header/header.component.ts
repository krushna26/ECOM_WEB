import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isloggedin = false;
  cartnumber: number = 0;  // Use 'number' instead of 'Number'
  loggedUserName = '';
  udata: any;
  cartdata:any[]=[];

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    
    // Subscribe to login status changes
    this.userService.loginStatusChanged.subscribe((status: boolean) => {
      this.isloggedin = status;
      if (status) {
        this.updateUserDetails(); // Update user details when logged in
      } else {
        this.resetUserDetails(); // Reset user details when logged out
      }
    });

    // Initialize user details if already logged in
    if (this.userService.isAuthenticated()) {
      this.isloggedin = true;
      this.updateUserDetails();
    }

    // Subscribe to cart changes
    this.userService.cart$.subscribe((cartCount: number) => {
      this.cartnumber+= cartCount; // Update cart count
    });    
  }

  // Update logged-in user's details including name and cart count
  updateUserDetails(): void {
    const userData = this.userService.getdatafromToken();
    if (userData && userData.id) {
      this.userService.getdatabyid(userData.id).subscribe(
        (res) => {
          if (res && res.data) {
            const user = res.data;
            this.loggedUserName = user.username;
            this.udata = res.data;
            const cartdata=res.data.cartitems;
            let m=0;
            for (let i=0;i<cartdata.length;i++){
              // console.log(cartdata[0]);
              
              this.cartnumber+=cartdata[i].quantity
            }  
                     
          }
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    }

  }
 
  // Reset user details when logging out
  private resetUserDetails(): void {
    this.loggedUserName = ''; 
    this.cartnumber = 0;
  }

  // Log out and reset the user details
  logout(): void {
    this.userService.logout();
    this.resetUserDetails();
    this.router.navigate(['/login']);
  }

  // Navigate to the cart page or prompt the user to log in
  navigateToCart(): void {
    if (!this.isloggedin) {
      alert('Please log in to view your cart.');
      this.router.navigate(['/login']); // Navigate to login page
    } else {
      this.router.navigate(['/cart']); // Navigate to the cart page if logged in
    }
  }
}
