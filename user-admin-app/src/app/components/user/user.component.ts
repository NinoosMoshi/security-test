import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  products :Product[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct(){
    return this.productService.getProducts().subscribe(
      data =>{
        this.products = data
      }
    )
  }
}
