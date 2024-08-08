import { Component, HostBinding, Input } from '@angular/core';
import { strings } from '../../../../constants';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
})
export class ErrorComponent {
  @Input() errorMessage?: string;
  strings = strings.apiErrors;

  @HostBinding('class') get classes(): string {
    return `absolute bottom-0 left-0 right-0 top-12 flex items-center justify-center`;
  }
}
