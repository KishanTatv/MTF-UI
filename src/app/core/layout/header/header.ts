import { CommonModule } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { IJwtClaims } from '../../interface/auth.interface';
import { RouterModule } from '@angular/router';
import { UserRole } from '../../../shared/common/enumHelper';

@Component({
  selector: 'app-header',
  imports: [
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  userData = input<IJwtClaims | null>();
  notifications = [
    { id: 1, message: 'Trip #TRP-1023 is delayed' },
    { id: 3, message: 'Driver A. Khan checked in' },
  ];
  userRole = UserRole;
  accountUserRole = 0;
  isAdmin = false;

  ngOnInit(): void {
    this.accountUserRole = Number(this.userData()?.role);
    if (this.accountUserRole > 0) {
      this.isAdmin = Number(this.userData()?.role) == UserRole['Super Admin'];
    }
  }
}
