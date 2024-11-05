import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  userdata:any;

  constructor(private userservice:UserService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.userservice.getdatabyid(id).subscribe((userdat:any)=>{      
      if(userdat){
        this.userdata=userdat.data
      }
    })

  }

}
