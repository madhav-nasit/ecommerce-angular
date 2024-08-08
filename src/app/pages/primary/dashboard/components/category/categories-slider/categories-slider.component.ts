import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ScrollButtonComponent } from '../scroll-button/scroll-button.component';
import { CategoryItemComponent } from '../category-item/category-item.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-slider',
  standalone: true,
  imports: [ScrollButtonComponent, CategoryItemComponent],
  templateUrl: './categories-slider.component.html',
  styleUrl: './categories-slider.component.css',
})
export class CategoriesSliderComponent implements OnInit, OnDestroy {
  @Input() categories: string[] | undefined;
  @Input() categoryName!: string;

  @ViewChild('container', { static: true }) containerRef!: ElementRef<HTMLDivElement>;

  hideLeftIcon: boolean = true;
  hideRightIcon: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.maxContainerItems();
    this.containerRef.nativeElement.addEventListener('scroll', this.handleScroll.bind(this));
  }

  ngOnDestroy(): void {
    this.containerRef.nativeElement.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  getScrollOffset(): number {
    const screenWidth = window.innerWidth;
    return screenWidth <= 768 ? 94 : 284;
  }

  handleScroll(): void {
    const container = this.containerRef.nativeElement;
    const scrollPos = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    this.hideLeftIcon = scrollPos <= 0;
    this.hideRightIcon = Math.ceil(scrollPos) >= maxScroll;
  }

  maxContainerItems(): void {
    const container = this.containerRef.nativeElement;
    const categoriesWidth = container.scrollWidth;
    const containerWidth = container.clientWidth;
    if (categoriesWidth < containerWidth) {
      this.hideRightIcon = true;
    }
  }

  scrollLeft(): void {
    this.containerRef.nativeElement.scrollBy({ left: -this.getScrollOffset(), behavior: 'smooth' });
  }

  scrollRight(): void {
    this.containerRef.nativeElement.scrollBy({ left: this.getScrollOffset(), behavior: 'smooth' });
  }

  onCategorySelect(category: string): void {
    if (category === 'all') {
      this.router.navigate(['']);
    } else {
      this.router.navigate([''], { queryParams: { category, page: 1 } });
    }
  }
}
