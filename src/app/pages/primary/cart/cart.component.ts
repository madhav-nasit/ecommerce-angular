import { Component } from '@angular/core';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { PageWrapperComponent } from '../components/page-wrapper/page-wrapper.component';
import { map, Observable } from 'rxjs';
import { CartService } from '../../../services/cart/cart.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Carts } from '../../../types';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../components/button/button.component';
import { DeleteConfirmComponent } from './components/delete-confirm/delete-confirm.component';

interface DeleteConfirmation {
  isVisible: boolean;
  onDelete?: () => void;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    SpinnerComponent,
    CartItemComponent,
    PageWrapperComponent,
    CommonModule,
    ButtonComponent,
    DeleteConfirmComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cart$!: Observable<Carts | null>;
  showRemoveItem: DeleteConfirmation = { isVisible: false };
  showRemoveCart: DeleteConfirmation = { isVisible: false };
  isPending: boolean = false;
  isError: boolean = false;
  errorMsg: string = '';

  constructor(
    private cartService: CartService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getCart();
    this.cart$ = this.cartService.cart$.pipe(
      map((state) => {
        if (state?.products && state?.products?.length === 0) {
          this.isError = true;
          this.errorMsg = 'Your cart is empty.';
        } else {
          this.isError = false;
          this.errorMsg = '';
        }
        return state;
      }),
    );
  }

  getCart() {
    this.cartService.getCart().subscribe();
  }

  handleQuantityChange({ id, quantity }: { id: string; quantity: number }) {
    if (quantity > 0) {
      this.updateCartItem(id, quantity);
    } else {
      this.showRemoveItem.isVisible = true;
      this.showRemoveItem.onDelete = () => {
        this.showRemoveItem.isVisible = false;
        this.deleteCartItem(id);
      };
    }
  }

  updateCartItem(id: string, newQuantity: number) {
    this.isPending = true;

    this.cartService.updateCartItem({ productId: id, quantity: newQuantity }).subscribe({
      next: () => {
        this.getCart();
      },
      error: (e) => {
        this.isPending = false;
        this.toastr.error('Failed to update cart item');
      },
      complete: () => {
        this.isPending = false;
      },
    });
  }

  deleteCartItem(id: string) {
    this.isPending = true;
    this.cartService.deleteCartItem(id).subscribe({
      next: () => {
        this.getCart();
      },
      error: (e) => {
        this.isPending = false;
        this.toastr.error('Failed to remove item');
      },
      complete: () => {
        this.isPending = false;
      },
    });
  }

  deleteCart(cartId: string) {
    this.showRemoveCart.isVisible = true;
    this.showRemoveCart.onDelete = () => {
      this.showRemoveCart.isVisible = false;
      this.isPending = true;
      this.cartService.deleteCart(cartId).subscribe({
        next: () => {
          this.getCart();
          this.router.navigate(['/']);
        },
        error: (e) => {
          this.isPending = false;
          this.toastr.error('Failed to delete cart');
        },
        complete: () => {
          this.isPending = false;
        },
      });
    };
  }

  onPlaceOrder() {
    this.isPending = true;
    this.cartService.placeOrder().subscribe({
      next: () => {
        this.getCart();
        this.toastr.success('Order placed successfully');
        this.router.navigate(['/']);
      },
      error: (e) => {
        this.isPending = false;
        this.toastr.error('Failed to place order');
      },
      complete: () => {
        this.isPending = false;
      },
    });
  }
}
