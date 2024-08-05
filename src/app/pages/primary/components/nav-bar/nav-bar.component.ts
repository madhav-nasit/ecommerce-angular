import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { AuthService } from '../../../../services';
import { map, Observable } from 'rxjs';
import { User } from '../../../../types';
import { ProfileMenuComponent } from '../profile-menu/profile-menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MenuItemComponent, MenuItemComponent, ProfileMenuComponent, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  user$!: Observable<User | null>;
  menuVisible = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.user$ = this.authService.user$.pipe(map((state) => state));
    this.getProfile();
  }

  getProfile() {
    this.authService.getProfile().subscribe();
  }

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
