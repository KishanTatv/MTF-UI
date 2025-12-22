import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, MatMenuModule, MatButtonModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  notifications = [
    { id: 1, message: 'Trip #TRP-1023 is delayed' },
    { id: 3, message: 'Driver A. Khan checked in' },
  ];
}
