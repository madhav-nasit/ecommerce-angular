import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../components/button/button.component';
import { routes, strings } from '../../../constants';
import { svg } from '../../../../assets/svgs';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css',
})
export class ErrorPageComponent {
  error: any = {}; // Replace with actual error fetching logic
  strings = strings.common;
  svgPaths = svg;

  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigateByUrl(routes.root); // Adjust the route as necessary
  }
}
