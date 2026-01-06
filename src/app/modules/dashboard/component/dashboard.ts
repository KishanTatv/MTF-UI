import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorage } from '../../../shared/service/local-storage/local-storage';
import { IJwtClaims } from '../../../core/interface/auth.interface';
import { AuthInfoKeys } from '../../../shared/common/constant';
import { UserRole } from '../../../shared/common/enumHelper';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  userInfo!: IJwtClaims | null;
  role: number = 0;
  userRole = UserRole;

  constructor(
    private storageService: LocalStorage,
    private jwtHelperService: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.userInfo = this.jwtHelperService.decodeToken(
      this.storageService.get(AuthInfoKeys.access_token)!
    );
    this.role = Number(this.userInfo?.role);
  }
}
