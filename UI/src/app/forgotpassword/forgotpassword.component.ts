import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
})
export class ForgotpasswordComponent implements OnInit {
  errmsg: string = '';
  constructor(private userservice: UserService, private route: Router) {}
  ngOnInit(): void {}
  forgot(resetdata: any) {
    if (resetdata.newpassword != resetdata.cnfnewpassword) {
      this.errmsg = 'Conform Password and Re-Entered password not Matched !';
      setTimeout(() => {
        this.errmsg = '';
      }, 3000);
      this.route.navigate(['/forgot-password']);
    } else {
      const resetdata1 = {
        email: resetdata.email,
        password: resetdata.newpassword,
      };
      this.userservice.resetpassword(resetdata1).subscribe(
        (res: any) => {
        if (res) {
            alert('Password Reseted !!');
            this.route.navigate(['/login']);
          }
        else{
          alert("No data found")
        }
        },
        (error) => {
          console.log(error);
          this.errmsg = error;
          
          
          // setTimeout(() => {
          //   this.errmsg = '';
          // }, 3000);
        }
      );
    }
  }
}
