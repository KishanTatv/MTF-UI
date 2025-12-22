import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IResponseModel } from '../../common/response.interface';

const ROOT_API: string = environment.baseURL;

@Injectable({
  providedIn: 'root',
})
export class HttpHandler {
  constructor(private http: HttpClient) {}

  httpGet<T>(path: string) {
    return this.http.get<IResponseModel<T>>(ROOT_API + path);
  }

  httpPost<T>(path: string, body: any) {
    return this.http.post<IResponseModel<T>>(ROOT_API + path, body);
  }

  httpPut<T>(path: string, body: any) {
    return this.http.put<IResponseModel<T>>(ROOT_API + path, body);
  }

  httpPatch<T>(path: string, body: object) {
    return this.http.patch<IResponseModel<T>>(ROOT_API + path, body);
  }

  httpDelete<T>(path: string) {
    return this.http.delete<IResponseModel<T>>(ROOT_API + path);
  }

  httpGetBlob(path: string) {
    return this.http.get(ROOT_API + path, { responseType: 'blob' });
  }
}
