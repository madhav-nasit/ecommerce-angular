import { FormGroup } from '@angular/forms';
import { convertCamelCaseToReadable } from './string.helper';

export const getControlError = (form: FormGroup<any>, controlName: string): string | undefined => {
  const control = form.controls[controlName];
  if (control.invalid && (control.dirty || control.touched) && control.errors) {
    const label = convertCamelCaseToReadable(controlName);
    if (control.errors['required']) {
      return `${label} is required`;
    } else if (control.errors['email']) {
      return 'Email is not valid';
    } else if (control.errors['pattern']) {
      if (controlName?.toLowerCase()?.includes('password')) {
        return 'Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character';
      } else {
        return `${label} is not valid`;
      }
    } else if (control.errors['requiredTrue']) {
      return 'You must accept the terms and conditions';
    }
  } else if (
    (control.dirty || control.touched) &&
    form.errors?.['mismatch'] &&
    controlName === 'confirmPassword'
  ) {
    return 'Passwords do not match';
  }
  return undefined;
};
