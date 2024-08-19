import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AddCart, CartItem, Carts } from '../../types';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { endPoints } from '../endPoints';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: BehaviorSubject<Carts | null> = new BehaviorSubject<Carts | null>(null);
  cart$: Observable<Carts | null> = this.cart.asObservable();

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {}

  getCart() {
    return this.http.get<Carts>(environment.apiUrl + endPoints.primary.cart).pipe(
      map((response) => {
        this.cart.next(response);
        return response;
      }),
    );
  }

  // Method to get the count of items in the cart
  get cartCount(): number {
    const cartValue = this.cart.getValue();
    if (cartValue && cartValue.products) {
      return cartValue.products.reduce((count, item) => count + item.quantity, 0);
    }
    return 0;
  }

  isProductInCart(productId: string): Observable<boolean> {
    return this.cart$.pipe(
      map((cart) => {
        if (cart && cart.products) {
          return cart.products.some((item) => item.product._id === productId);
        }
        return false;
      }),
    );
  }

  updateCartItem(addCartReq: AddCart) {
    return this.http.post<CartItem>(environment.apiUrl + endPoints.primary.cart, addCartReq).pipe(
      map((response) => {
        return response;
      }),
    );
  }

  deleteCart(cartId: string) {
    return this.http
      .delete<Carts>(environment.apiUrl + endPoints.primary.cart, {
        params: { cartId },
      })
      .pipe(
        map((response) => {
          return response;
        }),
      );
  }

  deleteCartItem(productId: string) {
    return this.http
      .delete<Carts>(environment.apiUrl + endPoints.primary.cart, {
        params: { productId },
      })
      .pipe(
        map((response) => {
          return response;
        }),
      );
  }

  placeOrder() {
    return this.http.post<CartItem>(environment.apiUrl + endPoints.primary.order, undefined).pipe(
      map((response) => {
        return response;
      }),
    );
  }
}
