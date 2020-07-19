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

  constructor( public productService: ProductsService ) { }

  ngOnInit(): void {

    this.listProduct = this.productService.getProduct();
    console.log('arreglo productos', this.listProduct); 
  }


  public addCart(product:Product)
  {
    this.productService.changeCart(product);
    console.log('asi llega el parámetro', product);
    
  }


}
