import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
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

  fullName: string = '';
  address: string = '';
  card: string = '';


  fullNameError: string = '';
  addressError: string = '';
  cardError: string = '';

 

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.cartProducts = this.productService.getCartProducts()
  }


  updateProductsAmount(product: Product, updatedAmount: number) {

    if(updatedAmount<=0) {
      alert("The product will be removed from the cart")
      return this.cartProducts = this.cartProducts.filter(p => p.id != product.id)
    }

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

  removeFromCart(product:Product) {
    alert("The product will be removed from the cart")
    return this.cartProducts = this.cartProducts.filter(p => p.id != product.id)
 
  }

  validateFullName() {
    if (this.fullName.length > 0 && this.fullName.length < 2) {
      this.fullNameError = 'Full name must be at least 2 characters.';
    } else {
      this.fullNameError = '';
    }
  }

  validateAddress() {
    if (!this.address.trim()) {
      this.addressError = 'Address cannot be empty.';
    } else {
      this.addressError = '';
    }
  }

  validateCard() {
    const cardNumberOnlyDigits = /^\d{16}$/;
    if (!cardNumberOnlyDigits.test(this.card)) {
      this.cardError = 'Credit card number must be exactly 16 digits.';
    } else {
      this.cardError = '';
    }
  }
  
}
