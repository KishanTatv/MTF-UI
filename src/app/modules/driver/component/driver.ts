import {
  Component,
  inject,
  signal,
  WritableSignal,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDriver } from './add-driver/add-driver';
import { Button } from '../../../shared/form-control/component/button/button';
import { MatTableModule } from '@angular/material/table';
import { IUserModel } from '../../user/interface/user-interface';
import { UserService } from '../../user/service/user-service';
import { UserRole } from '../../../shared/common/enumHelper';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AlertDialog } from '../../../shared/dialog/alert-dialog/alert-dialog';
import { SnackBar } from '../../../shared/service/snackbar/snack-bar';

@Component({
  selector: 'app-driver',
  imports: [Button, MatTableModule, CommonModule, MatIconModule],
  providers: [DatePipe],
  templateUrl: './driver.html',
  styleUrl: './driver.scss',
})
export class Driver implements OnInit {
  readonly dialog = inject(MatDialog);
  driverList: WritableSignal<IUserModel[]> = signal([]);
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'licenseNumber',
    'licenseExpiry',
    'userId',
  ];
  private readonly userService = inject(UserService);
  private readonly snackbar = inject(SnackBar);

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.userService.getUserList(UserRole.Driver).subscribe({
      next: (res) => {
        if (res.result) {
          this.driverList.set(res.data);
        }
      },
    });
  }

  openDialog(userId?: number) {
    const dialogRef = this.dialog.open(AddDriver, {
      data: { userId: userId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getUserData();
      }
    });
  }

  deleteDialog(userId: number) {
    const dialogRef = this.dialog.open(AlertDialog, {
      data: { userId: userId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.action) {
        this.userService.deleteUser(userId).subscribe({
          next: (res) => {
            if (res.result) {
              this.snackbar.success(res.message);
              this.getUserData();
            } else {
              this.snackbar.error(res.message);
            }
          },
        });
      }
    });
  }
}
