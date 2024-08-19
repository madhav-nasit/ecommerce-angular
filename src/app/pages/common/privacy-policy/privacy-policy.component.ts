import { Component } from '@angular/core';
import { NavBarComponent } from '../../primary/components/nav-bar/nav-bar.component';
import { AuthService } from '../../../services';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css',
})
export class PrivacyPolicyComponent {
  constructor(private authService: AuthService) {}

  isPrimaryFlow(): boolean {
    return this.authService.isAuthenticated();
  }
}
