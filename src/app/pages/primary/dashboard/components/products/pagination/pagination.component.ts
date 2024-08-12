import { Component, EventEmitter, Input, Output } from '@angular/core';
import { strings } from '../../../../../../constants';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  /** The current page number */
  @Input() currentPage: number = 1;
  /** The total number of pages */
  @Input() totalPages: number = 1;
  /** Callback function to handle page changes */
  @Output() onPageChange: EventEmitter<number> = new EventEmitter<number>();

  strings = strings.primary.dashboard;

  /**
   * Gets the array of total pages.
   */
  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  /**
   * Handles click event for pagination buttons.
   * @param page - The page number clicked.
   */
  handlePageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.onPageChange.emit(page);
    }
  }
}
