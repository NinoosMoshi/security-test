import { AdminAddComponent } from './../admin-add/admin-add.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild(AdminAddComponent)
  adminTemp: AdminAddComponent

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


  showAdminAdd(){
    this.adminTemp.sendToAdmin();
  }


  receivedFromSave(product: Product){

    let itemIndex = this.products.findIndex(item => item.id === product.id);

    if(itemIndex !== -1){
      this.products[itemIndex] = product;
    }else{
      this.products.push(product);
    }
  }








}
