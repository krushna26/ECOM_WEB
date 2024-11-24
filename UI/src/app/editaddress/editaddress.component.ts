import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-editaddress',
  templateUrl: './editaddress.component.html',
  styleUrls: ['./editaddress.component.css']
})
export class EditaddressComponent implements OnInit {

  constructor(private router:Router,private userService:UserService) { }

  ngOnInit(): void {
  }

  editaddress(newadd:any){
    this.userService.updateuseraddress(newadd);
    
    this.router.navigate(['/checkout']);
    // window.location.reload();
    
  
  }

}
