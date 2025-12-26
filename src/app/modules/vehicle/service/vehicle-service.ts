import { HttpHandler } from '../../../shared/service/http-handler/http-handler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseModel } from '../../../shared/common/response.interface';
import { IVehicleModel } from '../interface/vehicle.interface';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private http: HttpHandler) {}

  getVehicleList(): Observable<IResponseModel<IVehicleModel[]>> {
    return this.http.httpGet<IVehicleModel[]>(`Admin/GetVehicleList`);
  }

  getSingleVehicleList(
    vehicleId: number
  ): Observable<IResponseModel<IVehicleModel>> {
    return this.http.httpGet<IVehicleModel>(
      `Admin/GetSingleVehicle?vehicleId=${vehicleId}`
    );
  }

  upsertVehicle(data: IVehicleModel): Observable<IResponseModel<string>> {
    return this.http.httpPost<string>('Admin/UpsertVehicle', data);
  }

  deleteVehicle(vehicleId: number): Observable<IResponseModel<string>> {
    return this.http.httpDelete<string>(
      'Admin/DeleteVehicle?vehicleId=' + vehicleId
    );
  }
}
