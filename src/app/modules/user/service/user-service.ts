import { Injectable } from '@angular/core';
import { HttpHandler } from '../../../shared/service/http-handler/http-handler';
import { IResponseModel } from '../../../shared/common/response.interface';
import { Observable } from 'rxjs';
import { IUserModel } from '../interface/user-interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpHandler) {}

  getUserList(): Observable<IResponseModel<IUserModel[]>> {
    return this.http.httpGet<IUserModel[]>('Admin/GetUserList');
  }
}
