import { Component, inject } from '@angular/core';
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
  public deleteConfirmationModalRef = inject(MatDialogRef<AlertDialog>);
  public data: { title: string; desc: string; data?: string | object } =
    inject(MAT_DIALOG_DATA);

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
