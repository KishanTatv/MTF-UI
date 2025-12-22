import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBar {
  snackBarDuration: number = 5000;
  constructor(public _snackBar: MatSnackBar) {}

  success(message: string) {
    this._snackBar.open(message, 'X', {
      duration: this.snackBarDuration,
      panelClass: 'success',
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  error(message: string) {
    this._snackBar.open(message, 'X', {
      duration: this.snackBarDuration,
      panelClass: 'error',
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

}
