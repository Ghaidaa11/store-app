import { Component, OnInit, Output, Input } from '@angular/core';
import { ProductsService } from '../services/products-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../models/Product';
import { ProductItem } from '../product-item/product-item';


@Component({
  standalone: true,
  selector: 'app-products-list',
  imports: [CommonModule, FormsModule, ProductItem],
  templateUrl: './products-list.html',
  styleUrl: './products-list.css'
})
export class ProductsList implements OnInit {

  products: Product[] = []; 

  cartProducts: Product[] = []

  selectedProduct?: Product;

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data
    })
  }

  addProductToCart(product: Product, selectedAmount: number): void {
    this.productService.addProductToCart(product, selectedAmount)
  }

 showProductDetails(product: Product): void {
    this.selectedProduct = product
  }
  
onBackToList(): void {
  this.selectedProduct = undefined; 
}
 }
