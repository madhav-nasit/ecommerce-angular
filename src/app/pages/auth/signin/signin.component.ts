import { Component, HostBinding } from '@angular/core';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { InputComponent } from '../../../components/input/input.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { getControlError } from '../../../helper';
import { AuthService } from '../../../services';
import { regex, routes, strings } from '../../../constants';

type ControlNames = 'email' | 'password';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SpinnerComponent,
    InputComponent,
    ButtonComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  passwordRegex = regex.password;
  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(this.passwordRegex)]),
  });
  strings = strings.auth;
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  @HostBinding('class') get classes(): string {
    return `flex w-full justify-center md:my-auto`;
  }

  onSubmit() {
    if (this.signinForm.valid) {
      this.loading = true;
      const signInReq = {
        email: this.signinForm.value.email as string,
        password: this.signinForm.value.password as string,
      };
      this.authService.signIn(signInReq).subscribe({
        next: () => {
          this.router.navigateByUrl(routes.root);
        },
        error: (e) => (this.loading = false),
        complete: () => (this.loading = false),
      });
    } else {
      Object.keys(this.signinForm.controls).forEach((field) => {
        const control = this.signinForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }

  getError(controlName: ControlNames): string | undefined {
    return getControlError(this.signinForm, controlName);
  }
}
