import { Injectable } from '@angular/core';
import { HttpHandler } from '../../shared/service/http-handler/http-handler';
import { Observable } from 'rxjs';
import { IResponseModel } from '../../shared/common/response.interface';
import { ILoginModel, ITokenDTO } from '../interface/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly http: HttpHandler) {}

  login(loginData: ILoginModel): Observable<IResponseModel<ITokenDTO>> {
    return this.http.httpPost<ITokenDTO>('Auth/Login', loginData);
  }
}
