import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  cartProducts: Product [] = []
  allProducts: Product[] = []

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://fakestoreapi.com/products')
  }

  addProductToCart(product: Product, selectedAmount: number) {
    if (!this.cartProducts.includes(product)) {
      product.selectedAmount = selectedAmount
      this.cartProducts.push(product)
    } else {
      this.cartProducts.map(p => {
        p = {
          ...p,
          selectedAmount: p.selectedAmount+selectedAmount,
          price: p.price*selectedAmount
        }

      })
    }
    console.log("added",this.cartProducts )
  }

  getCartProducts(): Product[] {
    console.log('this.cartProducts', this.cartProducts)
    return this.cartProducts
  }

  
}
