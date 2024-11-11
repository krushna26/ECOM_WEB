import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  islogin: boolean = true;
  issignup: boolean = false;
  errmsg = '';
  sucmsg = '';
  issignedup = false; // Flag after successful signup
email1: any|string;

  constructor(private userService: UserService, private route: Router) { }

  ngOnInit(): void { }

  login(lndata: any) {
    const logindata = {
      email: lndata.email,
      password: lndata.password,
    };
    this.email1=lndata.email;

    // Now subscribe to the observable returned by loginService
    this.userService.loginService(logindata).subscribe(
      (res) => {
        if (res) {
          const token = res.token;
          localStorage.setItem('token', token);
          this.userService.loginStatusChanged.emit(true); // Emit login status
          this.route.navigate(['/']);
        }
      },
      (error) => {
        this.errmsg = error.error.msg;
        setTimeout(() => {
          this.errmsg = '';
          // location.reload();
        }, 6000);
      }
    );
  }

  signuped(data: any) {
    const add_line1 = data.add_line1;
    const add_line2 = data.add_line2;
    const country = data.country;
    const state = data.state;
    const District = data.District;
    const city = data.city;
    const pincode = Number(data.pincode);
    const signupdata = {
      username: data.name,
      email: data.email,
      password: data.password,
      useraddress: [
        add_line1,
        add_line2,
        country,
        state,
        District,
        city,
        pincode,
      ],
    };

    console.log('signupdata', signupdata);

    this.userService.signupservice(signupdata).subscribe(
      (res) => {
        this.issignedup = true;
        this.sucmsg = 'Signed up successfully!';
        this.route.navigate(['/login']);
        this.islogin = true;
        this.issignup = false;
        setTimeout(() => {
          this.sucmsg = '';
          this.issignedup = false;
        }, 3000);
      },
      (error) => {
        this.errmsg = error.error.msg;
        setTimeout(() => {
          this.errmsg = '';
        }, 6000);
      }
    );
  }

  decision1() {
    this.issignup = true;
    this.islogin = false;
  }

  decision2() {
    this.islogin = true;
    this.issignup = false;
  }
}
