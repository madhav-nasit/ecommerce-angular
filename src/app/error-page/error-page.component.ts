import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../components/button/button.component';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css',
})
export class ErrorPageComponent {
  error: any = {}; // Replace with actual error fetching logic

  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/']); // Adjust the route as necessary
  }
}
