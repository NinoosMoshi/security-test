import { ProductService } from './../../services/product.service';
import { Product } from './../../model/product';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

declare var $:any

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.css']
})
export class AdminAddComponent implements OnInit {

  @Input() product: Product = new Product();

  @Output() save = new EventEmitter();

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
  }


  saveProduct(){
    this.productService.saveProduct(this.product).subscribe({
      next: data =>{
        this.save.emit(data)
        $('#productModal').modal('hide');
      },
      error:err =>{

      }
    })
  }


  sendToAdmin(){
    $('#productModal').modal('show');
  }




}
