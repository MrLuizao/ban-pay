import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: Product[];
  private cart = new BehaviorSubject<Array<Product>>(null);
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

  public changeCart(newData: Product) {
    let listCart = this.cart.getValue();
    console.log('list cart desde el servicio', listCart);
    
    if(listCart)
    {
      //Buscamos si ya cargamos ese item en el carrito
      let objIndex = listCart.findIndex((obj => obj.name == newData.name));
      //Si ya cargamos uno aumentamos su cantidad
      if(objIndex != -1)
      {
        listCart[objIndex].price += 1;
      }
      //Si es el primer item de ese tipo lo agregamos derecho al carrito
      else {
        listCart.push(newData);
      }  
    }
    //Si es el primer elemento lo inicializamos
    else {
      listCart = [];
      listCart.push(newData);
    }

    this.cart.next(listCart);
  }

  public removeElementCart(newData:Product){
    //Obtenemos el valor actual de carrito
    let listCart = this.cart.getValue();
    //Buscamos el item del carrito para eliminar
    let objIndex = listCart.findIndex((obj => obj.name == newData.name));
    if(objIndex != -1)
    {
      //Seteamos la cantidad en 1 (ya que los array se modifican los valores por referencia, si vovlemos a agregarlo la cantidad no se reiniciará)
      listCart[objIndex].quanty = 1;
      //Eliminamos el item del array del carrito
      listCart.splice(objIndex,1);
    }

    this.cart.next(listCart);

  }
  
}

