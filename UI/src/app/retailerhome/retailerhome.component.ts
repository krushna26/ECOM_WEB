import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-retailerhome',
  templateUrl: './retailerhome.component.html',
  styleUrls: ['./retailerhome.component.css']
})
export class RetailerhomeComponent implements OnInit {
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