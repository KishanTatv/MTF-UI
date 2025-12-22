import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchAsyncValidator(
  passwordKey: string,
  confirmPasswordKey: string
): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get(passwordKey)?.value;
    const confirmPassword = formGroup.get(confirmPasswordKey)?.value;

    if (password !== confirmPassword) {
      formGroup.get(confirmPasswordKey)?.setErrors({ custom: true });
      return { custom: true };
    } else {
      const errors = formGroup.get(confirmPasswordKey)?.errors;
      if (errors) {
        delete errors['passwordMismatch'];
        if (Object.keys(errors).length === 0) {
          formGroup.get(confirmPasswordKey)?.setErrors(null);
        } else {
          formGroup.get(confirmPasswordKey)?.setErrors(errors);
        }
      }
      return null;
    }
  };
}
