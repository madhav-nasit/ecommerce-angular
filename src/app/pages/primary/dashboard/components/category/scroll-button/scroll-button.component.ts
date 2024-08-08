import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { svg } from '../../../../../../../assets/svgs';

@Component({
  selector: 'app-scroll-button',
  standalone: true,
  imports: [],
  templateUrl: './scroll-button.component.html',
  styleUrl: './scroll-button.component.css',
})
export class ScrollButtonComponent {
  svgPaths = svg;
  @Output() onClick = new EventEmitter();
  @Input() direction: 'left' | 'right' = 'left';
  @Input() hide: boolean = false;
  @Input() class?: string;

  @HostBinding('class') get classes(): string {
    return `absolute bottom-0 top-0 z-20 flex items-center justify-center ${
      this.direction === 'left' ? 'left-0' : 'right-0'
    } ${this.hide ? 'hidden' : ''}`;
  }

  onButtonClick(): void {
    this.onClick.emit();
  }
}
