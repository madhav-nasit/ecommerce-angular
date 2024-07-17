import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() className: string = '';

  @HostBinding('class') get classes(): string {
    return `font-regular rounded bg-button px-4 py-2 text-background transition-transform hover:scale-105 hover:bg-button-hover ${this.className}`;
  }
}
