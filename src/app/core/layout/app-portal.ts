import { Component, OnInit } from '@angular/core';
import { Header } from './header/header';
import { Sidebar } from './sidebar/sidebar';
import { RouterOutlet } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorage } from '../../shared/service/local-storage/local-storage';
import { AuthInfoKeys } from '../../shared/common/constant';
import { IJwtClaims } from '../interface/auth.interface';

@Component({
  selector: 'app-app-portal',
  imports: [RouterOutlet, Header, Sidebar],
  templateUrl: './app-portal.html',
  styleUrl: './app-portal.scss',
})
export class AppPortal implements OnInit {
  userInfo!: IJwtClaims | null;
  constructor(
    private storageService: LocalStorage,
    private jwtHelperService: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.userInfo = this.jwtHelperService.decodeToken(
      this.storageService.get(AuthInfoKeys.access_token)!
    );
  }
}
