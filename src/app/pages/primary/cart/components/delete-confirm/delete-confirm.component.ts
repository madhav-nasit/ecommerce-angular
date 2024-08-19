import { Component, EventEmitter, Input, Output } from '@angular/core';
import { strings } from '../../../../../constants';

@Component({
  selector: 'app-delete-confirm',
  standalone: true,
  imports: [],
  templateUrl: './delete-confirm.component.html',
  styleUrl: './delete-confirm.component.css',
})
export class DeleteConfirmComponent {
  @Input() heading!: string;
  @Input() message!: string;
  @Output() delete = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  strings = strings.primary.cart;

  onDelete() {
    this.delete.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
