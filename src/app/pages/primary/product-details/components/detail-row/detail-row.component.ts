import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detail-row',
  standalone: true,
  imports: [],
  templateUrl: './detail-row.component.html',
  styleUrl: './detail-row.component.css',
})
export class DetailRowComponent {
  /** The heading for the detail */
  @Input() heading!: string;
  /** The value for the detail */
  @Input() value?: string | number;
}
