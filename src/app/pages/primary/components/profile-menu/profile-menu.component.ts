import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services';
import { User } from '../../../../types';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [],
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.css',
})
export class ProfileMenuComponent {
  @Input() user?: User | null;
  menuVisible = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogout(): void {
    this.authService.logout();
  }

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }
}
