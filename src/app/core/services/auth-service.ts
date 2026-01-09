import { inject, Injectable } from '@angular/core';
import { HttpHandler } from '../../shared/service/http-handler/http-handler';
import { Observable, tap } from 'rxjs';
import { IResponseModel } from '../../shared/common/response.interface';
import {
  ILoginModel,
  IRegisterModel,
  ITokenDTO,
} from '../interface/auth.interface';
import { LocalStorage } from '../../shared/service/local-storage/local-storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpHandler);
  private readonly storageService = inject(LocalStorage);

  register(loginData: IRegisterModel): Observable<IResponseModel<string>> {
    return this.http.httpPost<string>('Auth/Registration', loginData);
  }

  login(loginData: ILoginModel): Observable<IResponseModel<ITokenDTO>> {
    return this.http.httpPost<ITokenDTO>('Auth/Login', loginData);
  }

  refreshToken(
    accessToken: string,
    refreshToken: string
  ): Observable<IResponseModel<ITokenDTO>> {
    return this.http
      .httpPost<ITokenDTO>('Auth/RefreshToken', {
        refreshToken,
        accessToken,
      })
      .pipe(
        tap((res) => {
          if (res.result) {
            this.storageService.resetToken(
              res.data.token,
              res.data.refreshToken
            );
          }
        })
      );
  }
}
