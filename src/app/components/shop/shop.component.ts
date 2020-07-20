import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/Item'
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  listProduct: Product[];
  
  listProducts: Item [];
  

  constructor( public productService: ProductsService ) { }

  ngOnInit(){
    this.listProduct = this.productService.getProduct();
  }

  addCart(product:Item){
    this.productService.changeCart(product);
  }


}
