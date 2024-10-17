import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Route, Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userserice:UserService) { }

  ngOnInit(): void {
  }

  login(lndata:any){
    const logindata={
      email:lndata.email,
      password:lndata.password
    }
    this.userserice.loginService(logindata).subscribe((res)=>{
      if(res){
        const token=res.token;
        localStorage.setItem('token',token);
        console.log("LoggedIn Successfully !")
      }
    }
    ,(error)=>{
       
      console.log(error.error.msg);
      
    }
  
  )
   
  }
}
