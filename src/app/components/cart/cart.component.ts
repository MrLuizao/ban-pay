import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';
import { Item } from 'src/app/models/Item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public items: Array<Item>

  public totalPrice:number = 0;
  public totalQuantity:number = 0;

  constructor( public productService: ProductsService ) { }

  ngOnInit() {

    this.productService.currentDataCart$.subscribe(x=>{
      if(x)
      {
        this.items = x;
        this.totalQuantity = x.length;
        this.totalPrice = x.reduce((sum, current) => sum + (current.price * current.quantity), 0);
      }
    })
  }

  public remove(product:Item)
  {
    this.productService.removeElementCart(product);
  }

}
