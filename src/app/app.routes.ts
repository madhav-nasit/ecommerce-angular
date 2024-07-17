import { Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AppComponent } from './app.component';

export const routes: Routes = [];
export const routes: Routes = [
  { path: '', component: AppComponent }, // Your home route
  { path: '**', component: ErrorPageComponent }, // Wildcard route for a 404 page
];
