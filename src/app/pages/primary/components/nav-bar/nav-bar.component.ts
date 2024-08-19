import { Component, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { AuthService } from '../../../../services';
import { map, Observable } from 'rxjs';
import { Carts, User } from '../../../../types';
import { ProfileMenuComponent } from '../profile-menu/profile-menu.component';
import { CommonModule } from '@angular/common';
import { routes, strings } from '../../../../constants';
import { svg } from '../../../../../assets/svgs';
import { CartService } from '../../../../services/cart/cart.service';
import { CartButtonComponent } from '../cart-button/cart-button.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    MenuItemComponent,
    MenuItemComponent,
    ProfileMenuComponent,
    CommonModule,
    CartButtonComponent,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  @Input() sticky = true;
  user$!: Observable<User | null>;
  menuVisible = false;
  commonStrings = strings.common;
  strings = strings.primary;
  svgPaths = svg;
  routes = routes;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.user$.pipe(map((state) => state));
    this.getProfile();
    this.getCart();
  }

  @HostBinding('class') get classes(): string {
    return this.sticky ? 'sticky start-0 top-0' : '';
  }

  getProfile() {
    this.authService.getProfile().subscribe();
  }

  getCart() {
    this.cartService.getCart().subscribe();
  }

  getCartCount() {
    return this.cartService.cartCount;
  }

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
