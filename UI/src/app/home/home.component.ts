import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
// import { error } from 'console';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  all_products:any[]=[]

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
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
