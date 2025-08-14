import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../services/products-service';
import { Product } from '../models/Product';


@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
  standalone: true
})
export class Cart implements OnInit {

  cartProducts: Product[] = []

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.cartProducts = this.productService.getCartProducts()
  }


  updateProductsAmount(product: Product, updatedAmount: number) {

    this.cartProducts.map(p => {
      
      if (p.id === product.id) {
        return {
          ...p,
          selectedAmount: updatedAmount,
          price: product.price * updatedAmount
        }
      }
      
      return p
    })

    return this.cartProducts
  }

  getCartTotal(): number {
    const total = this.cartProducts.reduce((sum, p) => {
      return sum + ((p.price * p.selectedAmount))
    } 
    , 0)

    return parseFloat(total.toFixed(2))
  } 

  onSubmit(): void {
    alert("data submitted correctly.")
  }
}
