import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseModel } from '../../../shared/common/response.interface';
import { IVehicleModel } from '../../vehicle/interface/vehicle.interface';
import { HttpHandler } from '../../../shared/service/http-handler/http-handler';
import {
  ITripList,
  ITripModel,
  ITripOptionModel,
} from '../interface/trip.interface';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  constructor(private http: HttpHandler) {}

  getTripOptionList(): Observable<IResponseModel<ITripOptionModel>> {
    return this.http.httpGet<ITripOptionModel>(`Admin/GetTripOptionList`);
  }

  getTripList(): Observable<IResponseModel<ITripList[]>> {
    return this.http.httpGet<ITripList[]>(`Admin/GetTripList`);
  }

  getSingleTrip(tripId: number): Observable<IResponseModel<ITripModel>> {
    return this.http.httpGet<ITripModel>(
      `Admin/GetSingleTripDetail?tripId=${tripId}`
    );
  }

  upsertTrip(data: IVehicleModel): Observable<IResponseModel<string>> {
    return this.http.httpPost<string>('Admin/UpsertTrip', data);
  }

  deleteTrip(tripId: number): Observable<IResponseModel<string>> {
    return this.http.httpDelete<string>('Admin/DeleteTrip?tripId=' + tripId);
  }

  markTripInprogress(tripId: number): Observable<IResponseModel<string>> {
    return this.http.httpGet<string>(
      `Admin/MarkTripAsInprogress?tripId=${tripId}`
    );
  }
}
