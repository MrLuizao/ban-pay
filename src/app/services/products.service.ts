import { Injectable } from '@angular/core';
import { Product } from '../models/Product';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: Product[];

  constructor() { }

  getProduct() {
    if(localStorage.getItem('products') === null) {
      this.products = [];
    } else {
      this.products = JSON.parse(localStorage.getItem('products'));
    }
    return this.products;
  }

  addProduct(product: Product) {
    this.products.push(product);
    let products = [];
    if(localStorage.getItem('products') === null) {
      products = [];
      products.push(product);
      localStorage.setItem('products', JSON.stringify(products));
    } else {
      products = JSON.parse(localStorage.getItem('products'));
      products.push(product); 
      localStorage.setItem('products', JSON.stringify(products));
    }
  }

  deleteProduct(product: Product) {
    for (let i = 0; i < this.products.length; i++) {
      if (product == this.products[i]) {
        this.products.splice(i, 1);
        localStorage.setItem('products', JSON.stringify(this.products));
      }
    }
  }
  
}

