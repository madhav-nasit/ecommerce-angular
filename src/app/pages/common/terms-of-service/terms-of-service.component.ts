import { Component } from '@angular/core';
import { NavBarComponent } from '../../primary/components/nav-bar/nav-bar.component';
import { AuthService } from '../../../services';

@Component({
  selector: 'app-terms-of-service',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './terms-of-service.component.html',
  styleUrl: './terms-of-service.component.css',
})
export class TermsOfServiceComponent {
  constructor(private authService: AuthService) {}

  isPrimaryFlow(): boolean {
    return this.authService.isAuthenticated();
  }
}
