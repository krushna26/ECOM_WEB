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
  cartnumber = 0;
  loggedUserName = '';

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
     this.loadCartCount();

    // Subscribe to login status changes for real-time updates
    this.userService.loginStatusChanged.subscribe((status: boolean) => {
      this.isloggedin = status;
      if (status) {
        this.updateUserDetails(); 
      } else {
        this.resetUserDetails(); 
      }
    });

    // Initialize user details if already logged in
    if (this.userService.isAuthenticated()) {
      this.isloggedin = true;
      this.updateUserDetails();
    }
  }

  // Load cart count from local storage
  private loadCartCount(): void {
    const storedCartCount = localStorage.getItem('cartcount');
    this.cartnumber = storedCartCount ? Number(storedCartCount) : 0;
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
            // Uncomment if cart items are available in user data
            this.cartnumber = user.cartItems?.length || 0;
          }
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    }
  }

  // Reset user details
  private resetUserDetails(): void {
    this.loggedUserName = ''; 
    this.cartnumber = 0;      
  }

  logout(): void {
    this.userService.logout();
    this.resetUserDetails();
    this.router.navigate(['/login']);
  }
}
