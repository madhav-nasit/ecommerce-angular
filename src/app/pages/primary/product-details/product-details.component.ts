import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../types';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services';
import { PrimaryService } from '../../../services/primary/primary.service';
import { routes, strings } from '../../../constants';
import { PageWrapperComponent } from '../components/page-wrapper/page-wrapper.component';
import { DetailRowComponent } from './components/detail-row/detail-row.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [PageWrapperComponent, DetailRowComponent, ButtonComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  productId: string;
  product: Product | undefined;
  mainImage: string | undefined;
  user: any;
  isError = false;
  isPending = true;
  productInCart: boolean = false;
  strings = strings.primary.productDetails;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private primaryService: PrimaryService,
    private cartService: CartService,
  ) {
    this.productId = this.route.snapshot.paramMap.get('productId')!;
  }

  ngOnInit(): void {
    this.getProductDetails();
    this.isProductInCart();
  }

  isProductInCart() {
    this.cartService.isProductInCart(this.productId).subscribe((isInCart) => {
      this.productInCart = isInCart;
    });
  }

  getProductDetails() {
    this.primaryService.getProductById(this.productId).subscribe({
      next: (product) => {
        this.product = product;
        this.handleThumbnailClick(product.thumbnail);
        // Lazy load till images get loaded on small box
        setTimeout(() => {
          if (product?.images.length > 0) {
            this.handleThumbnailClick(product.images[0]);
          }
        }, 500);
        this.isPending = false;
      },
      error: () => {
        this.isError = true;
        this.isPending = false;
      },
    });
  }

  addToCart() {
    this.isPending = true;

    this.cartService.updateCartItem({ productId: this.productId, quantity: 1 }).subscribe({
      next: () => {
        this.router.navigateByUrl(routes.cart);
      },
      error: (e) => {
        this.isPending = false;
      },
      complete: () => {
        this.isPending = false;
      },
    });
  }

  handleThumbnailClick(image: string) {
    this.mainImage = image;
  }

  goToCart() {
    this.router.navigate([routes.cart]);
  }
}
