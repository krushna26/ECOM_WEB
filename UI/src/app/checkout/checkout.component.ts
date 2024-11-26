import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  addresses: string[] = []; // Stores the list of addresses
  selectedAddress: string = ''; // Holds the selected address
  currentStep: number = 2; // Current step in the checkout process

  constructor(private userService: UserService,private orderService:OrderService) {}

  ngOnInit(): void {
    // Fetch user data from the token
    const userData = this.userService.getdatafromToken();

    if (userData && userData.id) {
      // Fetch user details by ID
      this.userService.getdatabyid(userData.id).subscribe({
        next: (res) => {
          // Populate addresses if data exists
          if (res && res.data) { 
            this.addresses = res.data.useraddress|| []; // Assuming `useraddress` is an array of strings
            this.addresses.reverse();
            this.selectedAddress=this.addresses[0];
            this.orderService.orderaddress(this.selectedAddress);
          } else {
            console.error('No address data found in response.');
          }
        },
        error: (err) => {
          console.error('Error fetching user data:', err);
        }
      });
    } else {
      console.warn('No user ID found in token.');
    } 
    
   
  }

   onSelectionChange(option: string) {
    this.selectedAddress = option;
    this.orderService.orderaddress(this.selectedAddress);
  }

 
}
