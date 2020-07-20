import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { BehaviorSubject } from 'rxjs';
import { Item } from 'src/app/models/Item';


@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  products: Product[];
  private cart = new BehaviorSubject<Array<Item>>(null);
  public currentDataCart$ = this.cart.asObservable();

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

  changeCart(newData: Item) {

    let listCart = this.cart.getValue();
    console.log('list cart desde el servicio', listCart);
    
    if(listCart)
    {
      listCart.findIndex((obj => obj == newData));
      listCart.push(newData);

    }else {
      listCart = [];
      listCart.push(newData);
    }

    this.cart.next(listCart);
  }

  removeElementCart(newData:Item){

    let listCart = this.cart.getValue();
    let objIndex = listCart.findIndex((obj => obj == newData));

    if(objIndex != -1)
    {
      listCart[objIndex].quantity = 1;
      listCart.splice(objIndex,1);
    }

    this.cart.next(listCart);
  }
  
}

