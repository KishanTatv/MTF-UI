import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  signal,
  WritableSignal,
  OnInit,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Button } from '../../../shared/form-control/component/button/button';
import { MatDialog } from '@angular/material/dialog';
import { IVehicleModel } from '../interface/vehicle.interface';
import { VehicleService } from '../service/vehicle-service';
import { SnackBar } from '../../../shared/service/snackbar/snack-bar';
import { AlertDialog } from '../../../shared/dialog/alert-dialog/alert-dialog';
import { AddVehicle } from './add-vehicle/add-vehicle';

@Component({
  selector: 'app-vehicle',
  imports: [Button, MatTableModule, CommonModule, MatIconModule],
  templateUrl: './vehicle.html',
  styleUrl: './vehicle.scss',
})
export class Vehicle implements OnInit {
  readonly dialog = inject(MatDialog);
  vehicleList: WritableSignal<IVehicleModel[]> = signal([]);
  displayedColumns: string[] = [
    'licensePlate',
    'vin',
    'type',
    'model',
    'capacity',
    'insuranceNumber',
    'insuranceExpiry',
    'vehicleId',
  ];
  private readonly vehicleService = inject(VehicleService);
  private readonly snackbar = inject(SnackBar);

  ngOnInit(): void {
    this.getVehicleData();
  }

  getVehicleData() {
    this.vehicleService.getVehicleList().subscribe({
      next: (res) => {
        if (res.result) {
          this.vehicleList.set(res.data);
        }
      },
    });
  }

  openDialog(vehicleId?: number) {
    const dialogRef = this.dialog.open(AddVehicle, {
      data: { vehicleId: vehicleId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getVehicleData();
      }
    });
  }

  deleteDialog(vehicleId: number) {
    const dialogRef = this.dialog.open(AlertDialog, {
      data: { vehicleId: vehicleId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.action) {
        this.vehicleService.deleteVehicle(vehicleId).subscribe({
          next: (res) => {
            if (res.result) {
              this.snackbar.success(res.message);
              this.getVehicleData();
            } else {
              this.snackbar.error(res.message);
            }
          },
        });
      }
    });
  }
}
