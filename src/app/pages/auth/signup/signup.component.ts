import { Component, HostBinding } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { InputComponent } from '../../../components/input/input.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { getControlError } from '../../../helper';
import { AuthService } from '../../../services';
import { regex, routes, strings } from '../../../constants';

type ControlNames =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'password'
  | 'confirmPassword'
  | 'acceptTerms';

@Component({
  selector: 'app-signup',
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
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  passwordRegex = regex.password;
  loading: boolean = false;
  strings = strings.auth;
  routes = routes;
  signupForm = new FormGroup(
    {
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(this.passwordRegex)]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(this.passwordRegex),
      ]),
      acceptTerms: new FormControl(false, [Validators.requiredTrue]),
    },
    { validators: this.passwordMatchValidator },
  );

  constructor(private authService: AuthService, private router: Router) {}

  @HostBinding('class') get classes(): string {
    return `flex w-full justify-center md:my-auto`;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.loading = true;
      const signUpReq = {
        firstName: this.signupForm.value.firstName as string,
        lastName: this.signupForm.value.firstName as string,
        email: this.signupForm.value.email as string,
        password: this.signupForm.value.password as string,
      };
      this.authService.signUp(signUpReq).subscribe({
        next: () => {
          this.router.navigateByUrl(routes.signIn);
        },
        error: (e) => (this.loading = false),
        complete: () => (this.loading = false),
      });
    } else {
      Object.keys(this.signupForm.controls).forEach((field) => {
        const control = this.signupForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }

  getError(controlName: ControlNames): string | undefined {
    return getControlError(this.signupForm, controlName);
  }

  passwordMatchValidator(group: AbstractControl): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password && confirmPassword && password === confirmPassword ? null : { mismatch: true };
  }
}
