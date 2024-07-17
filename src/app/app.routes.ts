import { Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AppComponent } from './app.component';
import { AuthPageComponent } from './auth/auth-page/auth-page.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';

export const routes: Routes = [
  { path: '', component: AppComponent }, // Your home route
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
