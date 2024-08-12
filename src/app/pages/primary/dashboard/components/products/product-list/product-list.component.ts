import { Component, Input } from '@angular/core';
import { Product } from '../../../../../../types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  @Input() products: Product[] = [];

  constructor(private router: Router) {}

  navigateToProductDetails(id: string): void {
    this.router.navigate([`/products/${id}`]);
  }
}
