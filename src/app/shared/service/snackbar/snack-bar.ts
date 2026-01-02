import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBar {
  snackBarDuration = 5000;
  constructor(public _snackBar: MatSnackBar) {}

  success(message: string) {
    this._snackBar.open(message, 'X', {
      duration: this.snackBarDuration,
      panelClass: 'success-snackbar',
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  info(message: string) {
    this._snackBar.open(message, 'X', {
      duration: this.snackBarDuration,
      panelClass: ['info-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  error(message: string) {
    this._snackBar.open(message, 'X', {
      duration: this.snackBarDuration,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
