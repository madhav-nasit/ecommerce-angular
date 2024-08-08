import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-category-item',
  standalone: true,
  imports: [],
  templateUrl: './category-item.component.html',
  styleUrl: './category-item.component.css',
})
export class CategoryItemComponent {
  @Input() item!: string;
  @Input() isSelected: boolean = false;

  @Output() onCategorySelect = new EventEmitter<string>();

  onClick(category: string): void {
    this.onCategorySelect.emit(category);
  }
}
