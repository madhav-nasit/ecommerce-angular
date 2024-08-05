import { Component } from '@angular/core';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-primary-page',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './primary-page.component.html',
  styleUrl: './primary-page.component.css',
})
export class PrimaryPageComponent {}
