import { Component, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesSliderComponent } from './components/category/categories-slider/categories-slider.component';
import { PrimaryService } from '../../../services/primary/primary.service';
import { PageWrapperComponent } from '../components/page-wrapper/page-wrapper.component';
import { Product } from '../../../types';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CategoriesSliderComponent, PageWrapperComponent],
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
  productLimit = 15;

  constructor(private route: ActivatedRoute, private primaryService: PrimaryService) {}

  @HostBinding('class') get classes(): string {
    return `flex flex-grow flex-col`;
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.getProducts(this.categoryName, this.productLimit, this.page);
    this.route.queryParamMap.subscribe((params) => {
      this.categoryName = params.get('category') || 'all';
    });
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
      },
      error: (e) => {
        this.error = true;
        this.loading = false;
        if (e) this.errorMsg = e;
      },
      complete: () => (this.loading = false),
    });
  }
}
