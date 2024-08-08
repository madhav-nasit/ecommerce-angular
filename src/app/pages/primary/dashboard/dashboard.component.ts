import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesSliderComponent } from './components/category/categories-slider/categories-slider.component';
import { PrimaryService } from '../../../services/primary/primary.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CategoriesSliderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  page: number = 1;
  categories: string[] = [];
  categoryName: string = 'all';
  loading = false;
  constructor(private route: ActivatedRoute, private primaryService: PrimaryService) {}

  ngOnInit(): void {
    this.getAllCategories();
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
}
