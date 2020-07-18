import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  products: Product[];

  constructor(public productService: ProductsService) {
  }
  
  ngOnInit() {
    this.products = this.productService.getProduct();
  }

  addProduct(product: Product) {
    console.log(product);
    this.productService.addProduct(product);
  }

}
