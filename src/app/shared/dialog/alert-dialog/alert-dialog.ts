import { Component, Inject } from '@angular/core';
import { Button } from '../../form-control/component/button/button';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-alert-dialog',
  imports: [MatDialogModule, MatButtonModule, MatIconModule, Button],
  templateUrl: './alert-dialog.html',
  styleUrl: './alert-dialog.scss',
})
export class AlertDialog {
  constructor(
    public deleteConfirmationModalRef: MatDialogRef<AlertDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; desc: string; data?: any }
  ) {}

  onConfirmClick(): void {
    this.deleteConfirmationModalRef.close({
      action: true,
      data: this.data.data,
    });
  }

  onCancelClick(): void {
    this.deleteConfirmationModalRef.close({
      action: false,
    });
  }
}
