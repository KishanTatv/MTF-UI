import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { SnackBar } from '../../shared/service/snackbar/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorage } from '../../shared/service/local-storage/local-storage';
import { AuthInfoKeys } from '../../shared/common/constant';
import { AuthService } from '../services/auth-service';
import { catchError, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const snackbarService = inject(SnackBar);
  const jwtHelperService = inject(JwtHelperService);
  const storageService = inject(LocalStorage);
  const authService = inject(AuthService);
  const router = inject(Router);

  const access_token = storageService.get(AuthInfoKeys.access_token);
  const refresh_token = storageService.get(AuthInfoKeys.refresh_token);

  if (req.url.includes('Auth/RefreshToken')) {
    return next(setHeader(req, access_token!));
  }

  if (access_token && !jwtHelperService.isTokenExpired(access_token)) {
    return next(setHeader(req, access_token));
  } else if (refresh_token && !jwtHelperService.isTokenExpired(refresh_token)) {
    return authService.refreshToken(access_token!, refresh_token).pipe(
      switchMap((res) => {
        if (res.result) {
          return next(setHeader(req, res.data.token));
        } else {
          snackbarService.error(res.message || 'Session expired');
          router.navigate(['auth/login']);
          return throwError(() => new Error('Session expired'));
        }
      }),
      catchError(() => {
        return throwError(() => new Error('Refresh failed'));
      })
    );
  }

  if ((refresh_token && jwtHelperService.isTokenExpired(refresh_token)) || (access_token && jwtHelperService.isTokenExpired(access_token))) {
    router.navigate(['auth/login']);
    return throwError(() => new Error('Session expired'));
  }

  return next(req);
};

function setHeader(req: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
  req = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  return req;
}
