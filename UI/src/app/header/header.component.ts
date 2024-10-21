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

  constructor(private route: Router, private userService: UserService) { }

  ngOnInit(): void {
    const datas=this.userService.getdatafromToken();
    console.log(datas);
    

    this.userService.loginStatusChanged.subscribe((status: boolean) => {
      this.isloggedin = status;
    });
  }

  logout(): void {
    this.userService.logout();
    this.route.navigate(['/login']);
  }
}
