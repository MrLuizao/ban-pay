import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent implements OnInit {

  constructor( public productService: ProductsService) { }

  title: string;
  description: string;

  ngOnInit(): void {
  }

  addProduct(newTitle: HTMLInputElement, newDescription: HTMLInputElement) {
    this.productService.addProduct({
      title: newTitle.value,
      description: newDescription.value,
      hide: true
    });
    newTitle.value = '';
    newDescription.value = '';
    return false;
  }

}
