import { Component, HostBinding, Input } from '@angular/core';
import { SpinnerComponent } from '../../../../components/spinner/spinner.component';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-page-wrapper',
  standalone: true,
  imports: [SpinnerComponent, ErrorComponent],
  templateUrl: './page-wrapper.component.html',
  styleUrl: './page-wrapper.component.css',
})
export class PageWrapperComponent {
  @Input() isPending?: boolean;
  @Input() isError?: boolean;
  @Input() errorMsg?: string;

  @HostBinding('class') get classes(): string {
    return `flex flex-grow flex-col`;
  }
}
