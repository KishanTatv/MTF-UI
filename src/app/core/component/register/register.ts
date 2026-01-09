import { Component, inject, OnInit } from '@angular/core';
import { TextControl } from '../../../shared/form-control/component/text-control/text-control';
import { Button } from '../../../shared/form-control/component/button/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CaptchaCharacters, validation } from '../../../shared/common/constant';
import { AuthService } from '../../services/auth-service';
import { SnackBar } from '../../../shared/service/snackbar/snack-bar';
import { passwordMatchAsyncValidator } from '../../../shared/service/validators/passwordMatchAsyncValidator';
import { signupControl } from '../../config/auth.config';
import { MatError } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    TextControl,
    Button,
    ReactiveFormsModule,
    MatError,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit {
  form!: FormGroup;
  signupControl = signupControl;
  generatedCaptcha = '';
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly snackbar = inject(SnackBar);

  ngOnInit(): void {
    this.createSignUpForm();
    this.refreshCaptcha();
  }

  createSignUpForm() {
    this.form = this.fb.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.maxLength(20),
            Validators.pattern(validation.common.nameREGEX),
          ],
        ],
        lastName: [
          '',
          [
            Validators.maxLength(20),
            Validators.pattern(validation.common.nameREGEX),
          ],
        ],
        companyName: ['', [Validators.required, Validators.maxLength(100)]],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(validation.common.emailREGEX),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(validation.common.passwordREGEX),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        phone: [
          '',
          [
            Validators.required,
            Validators.pattern(validation.common.contactREGEX),
          ],
        ],
        captcha: ['', [Validators.required]],
      },
      {
        validators: passwordMatchAsyncValidator('password', 'confirmPassword'),
      }
    );
  }

  refreshCaptcha() {
    const chars = CaptchaCharacters;
    this.generatedCaptcha = Array.from({ length: 6 }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join('');
  }

  onSignUp() {
    const captchaControl = this.form.get('captcha');
    const enteredCaptcha = captchaControl?.value?.trim();
    const generated = this.generatedCaptcha.trim();
    console.log(this.generatedCaptcha, ' x ', enteredCaptcha);
    if (enteredCaptcha !== generated) {
      captchaControl?.setValue('');
      this.refreshCaptcha();
      this.form.markAllAsTouched();
      return;
    }

    if (this.form.valid) {
      this.authService.register(this.form.value).subscribe({
        next: (res) => {
          if (res.result) {
            this.snackbar.success(res.message + ' Please Try Login!');
            this.router.navigate(['auth/login']);
          } else {
            this.snackbar.error(res.message);
          }
        },
      });
    } else {
      this.snackbar.error('Form is incorrect !');
    }
  }
}
