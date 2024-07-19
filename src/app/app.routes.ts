import { Routes } from '@angular/router';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { AuthPageComponent } from './pages/auth/auth-page/auth-page.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { SigninComponent } from './pages/auth/signin/signin.component';
import { authGuard } from './guards';
import { DashboardComponent } from './primary/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard],
  }, // Your home route
  {
    path: 'auth',
    component: AuthPageComponent,
    children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
    ],
  }, // Your home route
  { path: '**', component: ErrorPageComponent }, // Wildcard route for a 404 page
];
