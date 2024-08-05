import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.css',
})
export class MenuItemComponent {
  @Input() href: string | undefined;

  constructor(private router: Router) {}

  isActive(): boolean {
    const currentRoute = this.router.url;
    return currentRoute === this.href;
  }
}
