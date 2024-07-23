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
  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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
      const signUpReq = {
        firstName: this.signupForm.value.firstName,
        lastName: this.signupForm.value.firstName,
        email: this.signupForm.value.email as string,
        password: this.signupForm.value.password as string,
      };
      this.authService.signIn(signUpReq).subscribe({
        next: () => {
          this.router.navigateByUrl('/auth/signin');
        },
        error: (e) => console.log('error', e),
        complete: () => console.info('complete'),
      });
    } else {
      Object.keys(this.signupForm.controls).forEach((field) => {
        const control = this.signupForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }

  convertCamelCaseToReadable(camelCaseString: string) {
    // Add a space before each uppercase letter
    const withSpaces = camelCaseString.replace(/([A-Z])/g, ' $1');
    // Capitalize the first letter and return the result
    return withSpaces.charAt(0).toUpperCase() + withSpaces?.toLowerCase().slice(1);
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
