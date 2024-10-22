import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product:any;

  constructor(private router:ActivatedRoute,private productService:ProductService,private route:Router) { }

  ngOnInit(): void {
    const id=this.router.snapshot.params['id'];
    this.productService.getcarElement(id).subscribe((res:any)=>{
      if(res){

        this.product=res.data;

      }
    },(error)=>{
      alert("No data found With Mentioned ID");
      this.route.navigate(['home']);
    }
  )



  }

}
