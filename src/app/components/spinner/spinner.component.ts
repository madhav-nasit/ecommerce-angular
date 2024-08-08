import { Component, Input } from '@angular/core';

interface SpinnerProps {
  class?: string;
}

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',
})
export class SpinnerComponent implements SpinnerProps {
  @Input() class: string = '';
}
