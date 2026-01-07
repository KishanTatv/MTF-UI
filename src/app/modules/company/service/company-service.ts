import { Injectable } from '@angular/core';
import { HttpHandler } from '../../../shared/service/http-handler/http-handler';
import { IResponseModel } from '../../../shared/common/response.interface';
import { Observable } from 'rxjs';
import { ITenant } from '../interface/company.interface';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpHandler) {}

  GetTenantList(): Observable<IResponseModel<ITenant[]>> {
    return this.http.httpGet<ITenant[]>(`Admin/GetTenantList`);
  }
}
