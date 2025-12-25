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

  getUserList(role?: number): Observable<IResponseModel<IUserModel[]>> {
    return this.http.httpGet<IUserModel[]>(
      `Admin/GetUserList${role ? '?role=' + role : ''}`
    );
  }

  getSingleUserList(userId: number): Observable<IResponseModel<IUserModel>> {
    return this.http.httpGet<IUserModel>(
      `Admin/GetSingleUser?userId=${userId}`
    );
  }

  addUser(data: IUserModel): Observable<IResponseModel<string>> {
    return this.http.httpPost<string>('Admin/CreateSubUser', data);
  }

  updateUser(data: IUserModel): Observable<IResponseModel<string>> {
    return this.http.httpPut<string>('Admin/UpdateSubUser', data);
  }

  deleteUser(userId: number): Observable<IResponseModel<string>> {
    return this.http.httpDelete<string>('Admin/DeleteSubUser?userId=' + userId);
  }
}
