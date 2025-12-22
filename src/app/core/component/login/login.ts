import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SnackBar } from '../../../shared/service/snackbar/snack-bar';
import { TextControl } from '../../../shared/form-control/component/text-control/text-control';
import { loginControl } from '../../config/auth.config';
import { AuthInfoKeys, validation } from '../../../shared/common/constant';
import { Button } from '../../../shared/form-control/component/button/button';
import { AuthService } from '../../services/auth-service';
import { LocalStorage } from '../../../shared/service/local-storage/local-storage';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [TextControl, Button, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  form!: FormGroup;
  loginControl = loginControl;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private storageService: LocalStorage,
    private snackbar: SnackBar
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.form = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.pattern(validation.common.emailREGEX)],
      ],
      password: ['', [Validators.required]],
      rememberMe: [1],
    });
  }

  onLogin() {
    if (this.form.valid) {
      this.authService
        .login({
          email: this.form.value.email,
          password: this.form.value.password,
        })
        .subscribe({
          next: (res) => {
            if (res.result) {
              this.storageService.set(
                AuthInfoKeys.access_token,
                res.data.token
              );
            }
          },
          error: (err) => {
            this.snackbar.error('try again later!');
          },
        });
    } else {
      this.snackbar.error('please fill correct form');
    }
  }
}
