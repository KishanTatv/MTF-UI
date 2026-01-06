import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Button } from '../../../shared/form-control/component/button/button';
import { MatDialog } from '@angular/material/dialog';
import { TripService } from '../service/trip-service';
import { SnackBar } from '../../../shared/service/snackbar/snack-bar';
import { AddTrip } from './add-trip/add-trip';
import { ITripList } from '../interface/trip.interface';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AlertDialog } from '../../../shared/dialog/alert-dialog/alert-dialog';
import { TripStatus } from '../../../shared/common/enumHelper';
import { specificDateFormats } from '../../../shared/common/constant';

@Component({
  selector: 'app-trip',
  imports: [Button, MatTableModule, CommonModule, MatIconModule],
  templateUrl: './trip.html',
  styleUrl: './trip.scss',
})
export class Trip implements OnInit {
  displayedColumns: string[] = [
    'driverName',
    'vehicleName',
    'origin',
    'startTime',
    'destination',
    'endTime',
    'status',
    'trip',
    'tripId',
  ];
  readonly dialog = inject(MatDialog);
  tripList: WritableSignal<ITripList[]> = signal([]);
  tripStatus = TripStatus;
  dateFormatHHMM: string = specificDateFormats.dd_MMM_YYYY_HH_MM;

  private readonly tripService = inject(TripService);
  private readonly snackbar = inject(SnackBar);

  ngOnInit(): void {
    this.getTripData();
  }

  getTripData() {
    this.tripService.getTripList().subscribe({
      next: (res) => {
        if (res.result) {
          this.tripList.set(res.data);
        }
      },
      error: (err) => {},
    });
  }

  markTripInprogress(tripId: number) {
    this.tripService.markTripInprogress(tripId).subscribe({
      next: (res) => {
        if (res.result) {
          this.snackbar.success(res.message);
          this.getTripData();
        } else {
          this.snackbar.error(res.message);
        }
      },
      error: (err) => {
        this.snackbar.error('Try Later!');
      },
    });
  }

  dateIsCurrentDate(startTimeDate: string): boolean {
    const today = new Date();
    const startDate = new Date(startTimeDate);
    today.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);
    return (
      today.getTime() == startDate.getTime() &&
      new Date(startTimeDate) >= new Date()
    );
  }

  openDialog(tripId?: number) {
    const dialogRef = this.dialog.open(AddTrip, {
      data: { tripId: tripId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getTripData();
      }
    });
  }

  deleteDialog(tripId: number) {
    const dialogRef = this.dialog.open(AlertDialog, {
      data: { tripId: tripId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.action) {
        this.tripService.deleteTrip(tripId).subscribe({
          next: (res) => {
            if (res.result) {
              this.snackbar.success(res.message);
              this.getTripData();
            } else {
              this.snackbar.error(res.message);
            }
          },
          error: (err) => {},
        });
      }
    });
  }
}
