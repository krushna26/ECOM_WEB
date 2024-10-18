import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Route, Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  islogin:boolean=true;
  issignup:boolean=false;
  errmsg="";
  sucmsg="";
  issignedup=false;//Need to change the flag after Login

  constructor(private userserice:UserService,private route:Router) { }

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
        this.route.navigate(['/retailhome']);
      }
    }
    ,(error)=>{
      this.errmsg=error.error.msg;
       
      console.log(error.error.msg);
      
    }
  
  )
   
  }
  signuped(data:any){
    

  }
  decision1(){
    this.issignup=true;
    this.islogin=false;
  }
  decision2(){
    this.islogin=true;
    this.issignup=false;
  }


}
