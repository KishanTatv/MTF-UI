import { ISelectOptionModel } from '../../../shared/form-control/interface/form-control.interface';

export interface ITripModel {
  tripId: number;
  vehicleId: number;
  driverId: number;
  origin: string;
  destination: string;
  startTime: Date;
  endTime: Date;
  status: string;
}

export interface ITripList {
  tripId: string;
  vehicleName: string;
  driverName: string;
  origin: string;
  destination: string;
  startTime: string;
  endTime: string;
  status: string;
}

export interface ITripOptionModel {
  drivers: ISelectOptionModel[];
  vehicles: ISelectOptionModel[];
}
