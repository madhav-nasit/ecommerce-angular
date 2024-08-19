import { Component, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '../../../../constants';
import { svg } from '../../../../../assets/svgs';

@Component({
  selector: 'app-cart-button',
  standalone: true,
  imports: [],
  templateUrl: './cart-button.component.html',
  styleUrl: './cart-button.component.css',
})
export class CartButtonComponent {
  @Input() count?: number;
  svgPaths = svg;
  @HostBinding('class') className = 'relative';

  constructor(private router: Router) {}

  navigateToCart(): void {
    this.router.navigateByUrl(routes.cart);
  }
}
