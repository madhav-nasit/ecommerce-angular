import { Component, EventEmitter, Input, Output } from '@angular/core';
import { strings } from '../../../../../constants';
import { CartItem } from '../../../../../types';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent {
  @Input() item!: CartItem;
  @Output() handleQuantityChange = new EventEmitter<{ id: string; quantity: number }>();

  strings = strings.primary.cart;

  onQuantityChange(id: string, quantity: number): void {
    this.handleQuantityChange.emit({ id, quantity });
  }

  calculateSubtotal(price: number, quantity: number) {
    return price * quantity;
  }
}
