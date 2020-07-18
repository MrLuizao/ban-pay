import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @Input() product: Product;

  constructor( public productService: ProductsService ) { }

  ngOnInit(): void {
  }

  deleteProduct(product: Product) {
    if(confirm('¿Realmente quieres eliminar el producto?')) {
      this.productService.deleteProduct(product);
    }
  }

}
