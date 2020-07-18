import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent implements OnInit {

  constructor( public productService: ProductsService) { }

  name: string;
  price: number;
  quanty: number;

  ngOnInit(): void {
  }

  addProduct(newName: HTMLInputElement, newPrice: HTMLInputElement, newQuanty: HTMLInputElement) {
    this.productService.addProduct({
      name: newName.value,
      price: newPrice.value,
      quanty: newQuanty.value,
      hide: true
    });
    newName.value = '';
    newPrice.value = '';
    newQuanty.value = '';
    return false;
  }

}
