import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SnackBar } from '../../shared/service/snackbar/snack-bar';
import { LocalStorage } from '../../shared/service/local-storage/local-storage';
import { AuthInfoKeys } from '../../shared/common/constant';

export const authGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const jwtHelperService = inject(JwtHelperService);
  const snackbarService = inject(SnackBar);
  const storageService = inject(LocalStorage);
  const LogIn_Route = 'auth/login';

  try {
    const accessToken = storageService.get(AuthInfoKeys.access_token);
    const refreshToken = storageService.get(AuthInfoKeys.refresh_token);
    const tokenRole = jwtHelperService.decodeToken(accessToken!).role;

    // only accessToken exists
    if (accessToken && !refreshToken) {
      if (jwtHelperService.isTokenExpired(accessToken)) {
        snackbarService.error('Session expired. Please login again.');
        router.navigateByUrl(LogIn_Route);
        return false;
      } else {
        if (checkValidRole(route.data['role'], tokenRole)) {
          return true;
        } else {
          snackbarService.error('Access Denied !');
          return false;
        }
      }
    }

    // both tokens exist
    if (accessToken && refreshToken) {
      // Prefer validating access token first
      if (
        !jwtHelperService.isTokenExpired(accessToken) &&
        checkValidRole(route.data['role'], tokenRole)
      ) {
        if (checkValidRole(route.data['role'], tokenRole)) {
          return true;
        } else {
          snackbarService.error('Access Denied !');
          return false;
        }
      }
      // Access token expired — check refresh token
      else if (!jwtHelperService.isTokenExpired(refreshToken)) {
        if (checkValidRole(route.data['role'], tokenRole)) {
          return true;
        } else {
          snackbarService.error('Access Denied !');
          return false;
        }
      } else {
        snackbarService.error('Your session has expired. Please login again.');
        router.navigateByUrl(LogIn_Route);
        return false;
      }
    }

    snackbarService.error('Invalid or corrupted token.');
    router.navigateByUrl(LogIn_Route);
    return false;
  } catch {
    snackbarService.error('Invalid or corrupted token.');
    router.navigateByUrl(LogIn_Route);
    return false;
  }
};

export function checkValidRole(role: number[], tokenRole: number): boolean {
  if (role) {
    if (role.find((x) => x == tokenRole)) {
      return true;
    }
    return false;
  } else {
    return true;
  }
}
