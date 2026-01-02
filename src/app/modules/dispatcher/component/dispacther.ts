import { Component, inject, signal, WritableSignal, OnInit } from '@angular/core';
import { Button } from '../../../shared/form-control/component/button/button';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { IUserModel } from '../../user/interface/user-interface';
import { UserService } from '../../user/service/user-service';
import { SnackBar } from '../../../shared/service/snackbar/snack-bar';
import { UserRole } from '../../../shared/common/enumHelper';
import { AddDispacther } from './add-dispacther/add-dispacther';
import { AlertDialog } from '../../../shared/dialog/alert-dialog/alert-dialog';

@Component({
  selector: 'app-dispacther',
  imports: [Button, MatTableModule, CommonModule, MatIconModule],
  templateUrl: './dispacther.html',
  styleUrl: './dispacther.scss',
})
export class Dispacther implements OnInit {
  readonly dialog = inject(MatDialog);
  driverList: WritableSignal<IUserModel[]> = signal([]);
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'userId',
  ];

  constructor(private userService: UserService, private snackbar: SnackBar) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.userService.getUserList(UserRole.Dispatcher).subscribe({
      next: (res) => {
        if (res.result) {
          this.driverList.set(res.data);
        }
      },
      error: (err) => {},
    });
  }

  openDialog(userId?: number) {
    const dialogRef = this.dialog.open(AddDispacther, {
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
          error: (err) => {},
        });
      }
    });
  }
}
