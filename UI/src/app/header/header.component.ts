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
  cartnumber :any;
  loggedUserName = '';
  udata:any;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.cartnumber=localStorage.getItem('cartcount')
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

  

  // Update logged-in user's details including name and cart count
  updateUserDetails(): void {
    const userData = this.userService.getdatafromToken();
    if (userData && userData.id) {
      this.userService.getdatabyid(userData.id).subscribe(
        (res) => {
          if (res && res.data) {
            const user = res.data;
            this.loggedUserName = user.username;
            this.udata=res.data;
            // console.log(this.udata);
            
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


  navigateToCart() {
    if (!this.isloggedin) {
      alert('Please log in to view your cart.');
      this.router.navigate(['/login']); // Navigate to the login page
    } else {
      this.router.navigate(['/cart']); // Navigate to the cart page if logged in
    }
  }

}
