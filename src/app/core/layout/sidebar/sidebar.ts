import { Component, input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { UserRole } from '../../../shared/common/enumHelper';

@Component({
  selector: 'app-sidebar',
  imports: [MatIconModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnInit {
  role = input<string>('');
  isCompanyOwner: boolean = false;
  isAdmin: boolean = false;
  isDispatcher: boolean = false;
  isDriver: boolean = false;

  ngOnInit(): void {
    this.isAdmin = UserRole['Super Admin'] == Number(this.role());
    this.isCompanyOwner = Number(this.role()) == UserRole['Company Owner'];
    this.isDispatcher = Number(this.role()) == UserRole['Dispatcher'];
    this.isDriver = Number(this.role()) == UserRole['Driver'];
  }
}
