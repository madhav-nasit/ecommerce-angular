import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../../types';
import { AuthService } from '../../services';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  user$!: Observable<User | null>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user$ = this.authService.user$.pipe(map((state) => state));
    this.getProfile();
  }

  getProfile() {
    this.authService.getProfile().subscribe();
  }

  onLogout(): void {
    this.authService.logout();
  }
}
