import { Component, OnInit, Output } from '@angular/core';
import { ProductsService } from '../services/products-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../models/Product';
import { Router } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-products-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './products-list.html',
  styleUrl: './products-list.css'
})
export class ProductsList implements OnInit {

  products: Product[] = []; 

  cartProducts: Product[] = []

  // selectedProduct?: Product;

  constructor(private productService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data
    })
  }

  addProductToCart(product: Product, selectedAmount: number): void {
    this.productService.addProductToCart(product, selectedAmount)
  }

 showProductDetails(product: Product): void {
    this.router.navigate(['/details'], { state: { data: product} });
  }

  detailsPage(product: Product): void {
    
  }
 }
