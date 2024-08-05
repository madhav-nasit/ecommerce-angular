import { FormGroup } from '@angular/forms';
import { convertCamelCaseToReadable } from './string.helper';
import { strings } from '../constants';

export const getControlError = (form: FormGroup<any>, controlName: string): string | undefined => {
  const control = form.controls[controlName];
  if (control.invalid && (control.dirty || control.touched) && control.errors) {
    const label = convertCamelCaseToReadable(controlName);
    if (control.errors['required']) {
      return strings.validation.required.replace('{label}', label);
    } else if (control.errors['email']) {
      return strings.validation.notValid.replace('{label}', label);
    } else if (control.errors['pattern']) {
      if (controlName?.toLowerCase()?.includes('password')) {
        return strings.validation.password;
      } else {
        return strings.validation.notValid.replace('{label}', label);
      }
    } else if (control.errors['requiredTrue']) {
      return strings.validation.acceptTerms;
    }
  } else if (
    (control.dirty || control.touched) &&
    form.errors?.['mismatch'] &&
    controlName === 'confirmPassword'
  ) {
    return strings.validation.doNotMatch;
  }
  return undefined;
};
