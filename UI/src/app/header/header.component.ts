import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service'; // Import your UserService

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isloggedin: boolean = false;
  cartnumber: number = 0;  
  loggedUserName: string = '';

  constructor(private route: Router, private userService: UserService) {}

  ngOnInit(): void {

    const a=localStorage.getItem('cartcount');
    if (a){
      this.cartnumber=Number(a);
    }
    // Subscribe to login status changes
    this.userService.loginStatusChanged.subscribe((status: boolean) => {
      this.isloggedin = status;
      this.updateUserDetails(); // Update user details whenever login status changes
    });
    
    // Check user details on initial load
    this.updateUserDetails();
  }

  updateUserDetails(): void {
    const userData = this.userService.getdatafromToken();
    if (userData && userData.id) {
      this.userService.getdatabyid(userData.id).subscribe((res) => {
        if (res && res.data) {
          const user = res.data;
          this.loggedUserName = user.username;
          // this.cartnumber = user.cartItems?.length || 0;  // Get actual cart count
        }
      });
    }
  }

  logout(): void {
    this.userService.logout();
    this.route.navigate(['/login']);
  }
}
