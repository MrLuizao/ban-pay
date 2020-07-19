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

  public changeCart(newData: Item) {

    let listCart = this.cart.getValue();
    console.log('list cart desde el servicio', listCart);
    
    if(listCart)
    {

      //Buscamos si ya cargamos ese item en el carrito
      let objIndex = listCart.findIndex((obj => obj.name == newData.name));
      //Si ya cargamos uno aumentamos su cantidad
      // if(objIndex != -1)
      // {
      //   listCart[objIndex].price += 1;
      // }
      //Si es el primer item de ese tipo lo agregamos derecho al carrito
      // else {


        listCart.push(newData);
      // }  
    }
    //Si es el primer elemento lo inicializamos
    else {
      listCart = [];
      listCart.push(newData);
    }

    this.cart.next(listCart);
  }

  
  public removeElementCart(newData:Item){

    let listCart = this.cart.getValue();
    let objIndex = listCart.findIndex((obj => obj.name == newData.name));

    if(objIndex != -1)
    {
      listCart[objIndex].quantity = 1;
      listCart.splice(objIndex,1);
    }

    this.cart.next(listCart);

  }
  
}

