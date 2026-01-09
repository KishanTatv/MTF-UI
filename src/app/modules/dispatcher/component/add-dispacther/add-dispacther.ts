import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Button } from '../../../../shared/form-control/component/button/button';
import { TextControl } from '../../../../shared/form-control/component/text-control/text-control';
import { userControl } from '../../../driver/config/driver.config';
import { UserService } from '../../../user/service/user-service';
import { SnackBar } from '../../../../shared/service/snackbar/snack-bar';
import { validation } from '../../../../shared/common/constant';
import { UserRole } from '../../../../shared/common/enumHelper';

@Component({
  selector: 'app-add-dispacther',
  imports: [MatDialogModule, ReactiveFormsModule, Button, TextControl],
  templateUrl: './add-dispacther.html',
  styleUrl: './add-dispacther.scss',
})
export class AddDispacther implements OnInit {
  form!: FormGroup;
  addUserControl = userControl;
  readonly dialogRef = inject(MatDialogRef<AddDispacther>);
  readonly data = inject<{userId: number}>(MAT_DIALOG_DATA);
  isEditMode = false;
  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly snackbar = inject(SnackBar);

  ngOnInit(): void {
    this.createLoginForm();
    if (this.data.userId > 0) {
      this.isEditMode = true;
      this.getUserData(this.data.userId);
    }
  }

  createLoginForm() {
    this.form = this.fb.group({
      userId: [null],
      firstName: [
        null,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern(validation.common.nameREGEX),
        ],
      ],
      lastName: [
        null,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern(validation.common.nameREGEX),
        ],
      ],
      email: [
        null,
        [
          Validators.required,
          Validators.required,
          Validators.pattern(validation.common.emailREGEX),
        ],
      ],
      phone: [
        null,
        [
          Validators.required,
          Validators.required,
          Validators.pattern(validation.common.contactREGEX),
        ],
      ],
      role: [UserRole.Dispatcher, [Validators.required]],
    });
  }

  getUserData(userId: number) {
    this.userService.getSingleUserList(userId).subscribe({
      next: (res) => {
        if (res.result) {
          this.form.patchValue(res.data);
        }
      },
    });
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.isEditMode) {
        this.userService.updateUser(this.form.value).subscribe({
          next: (res) => {
            if (res.result) {
              this.snackbar.success(res.message);
              this.dialogRef.close(true);
            } else {
              this.snackbar.error(res.message);
            }
          },
        });
      } else {
        this.userService.addUser(this.form.value).subscribe({
          next: (res) => {
            if (res.result) {
              this.snackbar.success(res.message);
              this.dialogRef.close(true);
            } else {
              this.snackbar.error(res.message);
            }
          },
        });
      }
    } else {
      this.snackbar.error('Please fill the form !');
    }
  }
}
