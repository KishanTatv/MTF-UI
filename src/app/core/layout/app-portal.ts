import { Component } from '@angular/core';
import { Header } from './header/header';
import { Sidebar } from './sidebar/sidebar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-app-portal',
  imports: [RouterOutlet, Header, Sidebar],
  templateUrl: './app-portal.html',
  styleUrl: './app-portal.scss',
})
export class AppPortal {}
