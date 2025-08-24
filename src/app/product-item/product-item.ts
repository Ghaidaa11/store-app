import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../models/Product';
import { ProductsService } from '../services/products-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-product-item',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-item.html',
  styleUrl: './product-item.css'
})
export class ProductItem {

  product: Product;
  
  @Input() productItem: Product | null = null;
  @Output() backward = new EventEmitter<void>();

constructor(private productService: ProductsService,
    private router: Router
  ) {
    const nav = this.router.getCurrentNavigation();
    this.product = nav?.extras.state?.['data'];
  }


   addProductToCart(product: Product, selectedAmount: number): void {
    this.productService.addProductToCart(product, selectedAmount)
  }

  toggleBackwardToList(): void {
    this.backward.emit()
  }

}
