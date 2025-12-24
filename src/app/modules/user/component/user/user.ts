import {
  ChangeDetectorRef,
  Component,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { UserService } from '../../service/user-service';
import { IUserModel } from '../../interface/user-interface';
import { MatTableModule } from '@angular/material/table';
import { UserRole } from '../../../../shared/common/enumHelper';

@Component({
  selector: 'app-user',
  imports: [MatTableModule],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User implements OnInit {
  userList: IUserModel[] = [];
  // userList: WritableSignal<IUserModel[]> = signal([]);
  UserRole = UserRole;
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'role',
    'phone',
  ];

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.userService.getUserList().subscribe({
      next: (res) => {
        if (res.result) {
          // this.userList.set(res.data);
          this.userList = res.data;
          this.cdr.detectChanges();
        }
      },
      error: (err) => {},
    });
  }
}
