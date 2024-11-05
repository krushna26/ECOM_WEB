import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  all_products:any[]=[]
  qt:number=1;
  elementbyid:any
  cartproducts:any[]=[]

  constructor(private productService:ProductService,private route:Router) { }

  ngOnInit(): void {

    //To show all product from the database to frontend 
    this.productService.viewallproduct().subscribe((res:any)=>{
      if(res){
        this.all_products=res.products
      }

    }
  ,(error)=>{
      console.log(error);

  })
  }

  
}
