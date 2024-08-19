import { Routes } from '@angular/router';
import { authGuard } from './guards';
import { ErrorPageComponent } from './pages/common/error-page/error-page.component';
import { AuthPageComponent } from './pages/auth/auth-page/auth-page.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { SigninComponent } from './pages/auth/signin/signin.component';
import { DashboardComponent } from './pages/primary/dashboard/dashboard.component';
import { PrimaryPageComponent } from './pages/primary/primary-page/primary-page.component';
import { PrivacyPolicyComponent } from './pages/common/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './pages/common/terms-of-service/terms-of-service.component';
import { ProductDetailsComponent } from './pages/primary/product-details/product-details.component';
import { CartComponent } from './pages/primary/cart/cart.component';

export const routes: Routes = [
  {
    path: '',
    component: PrimaryPageComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'products/:productId', component: ProductDetailsComponent },
      { path: 'cart', component: CartComponent },
    ],
  }, // primary flow routes
  {
    path: 'auth',
    component: AuthPageComponent,
    children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
    ],
  }, // auth flow routes
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms-and-condition', component: TermsOfServiceComponent },
  { path: '**', component: ErrorPageComponent }, // Wildcard route for a 404 page
];
