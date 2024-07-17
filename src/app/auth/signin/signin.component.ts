import { Component, HostBinding } from '@angular/core';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

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
  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(this.passwordRegex)]),
  });

  @HostBinding('class') get classes(): string {
    return `flex w-full justify-center md:my-auto`;
  }

  onSubmit() {
    console.log('this.signinForm.value', this.signinForm.value);
  }

  getEmailError(): string | undefined {
    const emailControl = this.signinForm.controls.email;
    if (
      emailControl.invalid &&
      (emailControl.dirty || emailControl.touched) &&
      emailControl.errors
    ) {
      if (emailControl.errors['required']) {
        return 'Email is required';
      } else if (emailControl.errors['email']) {
        return 'Email is not valid';
      }
    }
    return undefined;
  }

  getPasswordError(): string | undefined {
    const passwordControl = this.signinForm.controls.password;
    if (
      passwordControl.invalid &&
      (passwordControl.dirty || passwordControl.touched) &&
      passwordControl.errors
    ) {
      console.log('passwordControl.errors', passwordControl.errors);
      if (passwordControl.errors['required']) {
        return 'Password is required';
      } else if (passwordControl.errors['pattern']) {
        return 'Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character';
      }
    }
    return undefined;
  }
}
