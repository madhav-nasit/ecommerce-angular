import { Component, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesSliderComponent } from './components/category/categories-slider/categories-slider.component';
import { PrimaryService } from '../../../services/primary/primary.service';
import { PageWrapperComponent } from '../components/page-wrapper/page-wrapper.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { strings } from '../../../constants';
import { Product } from '../../../types';
import { PaginationComponent } from './components/products/pagination/pagination.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CategoriesSliderComponent,
    PageWrapperComponent,
    ProductListComponent,
    PaginationComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  page: number = 1;
  categories: string[] = [];
  products: Product[] = [];
  categoryName: string = 'all';
  loading = false;
  error = false;
  errorMsg = '';
  totalPages = 0;
  productLimit = 15;
  strings = strings.primary.dashboard;

  constructor(
    private route: ActivatedRoute,
    private primaryService: PrimaryService,
    private router: Router,
  ) {}

  @HostBinding('class') get classes(): string {
    return `flex flex-grow flex-col`;
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.route.queryParamMap.subscribe((params) => {
      this.categoryName = params.get('category') || 'all';
      this.page = params.get('page') ? parseInt(params.get('page') as string) : 1;
      this.getProducts(this.categoryName, this.productLimit, this.page);
    });
  }

  /**
   * Handles the page change event emitted by PaginationComponent.
   * @param page - The new page number.
   */
  handlePageChange(page: number): void {
    this.router.navigate([''], { queryParams: { category: this.categoryName, page: page } });
  }

  getAllCategories(): void {
    this.primaryService.getCategories().subscribe({
      next: (res) => {
        this.categories = ['all', ...res?.map((category) => category.name)];
      },
      error: (e) => (this.loading = false),
      complete: () => (this.loading = false),
    });
  }

  getProducts(categoryName: string, limit: number, page: number): void {
    this.loading = true;
    this.error = false;
    this.primaryService.getProducts(categoryName, limit, page).subscribe({
      next: (res) => {
        this.products = res.products;
        this.totalPages = res.total;
        if (res.products.length === 0) {
          this.error = true;
          this.errorMsg = this.strings.noProduct;
        }
      },
      error: (e) => {
        this.error = true;
        this.loading = false;
        if (e && e?.error) {
          this.errorMsg = e.error?.message;
        }
      },
      complete: () => (this.loading = false),
    });
  }
}
