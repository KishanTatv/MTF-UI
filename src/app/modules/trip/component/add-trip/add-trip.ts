import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Button } from '../../../../shared/form-control/component/button/button';
import { TextControl } from '../../../../shared/form-control/component/text-control/text-control';
import { SelectControl } from '../../../../shared/form-control/component/select-control/select-control';
import { DateTimePicker } from '../../../../shared/form-control/component/date-time-picker/date-time-picker';
import { SnackBar } from '../../../../shared/service/snackbar/snack-bar';
import { TripService } from '../../service/trip-service';
import { TripStatus } from '../../../../shared/common/enumHelper';
import { tripControl } from '../../config/trip.config';
import { ISelectOptionModel } from '../../../../shared/form-control/interface/form-control.interface';

@Component({
  selector: 'app-add-trip',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    Button,
    TextControl,
    DateTimePicker,
    SelectControl,
  ],
  templateUrl: './add-trip.html',
  styleUrl: './add-trip.scss',
})
export class AddTrip implements OnInit {
  form!: FormGroup;
  addTripControl = tripControl;
  driverOption: ISelectOptionModel[] = [];
  vehicleOption: ISelectOptionModel[] = [];
  isEditMode = false;

  private readonly dialogRef = inject(MatDialogRef<AddTrip>);
  private readonly data = inject<{tripId: number}>(MAT_DIALOG_DATA);
  private readonly fb = inject(FormBuilder);
  private readonly tripService = inject(TripService);
  private readonly snackbar = inject(SnackBar);

  ngOnInit(): void {
    this.createLoginForm();
    this.getDropdownList();
    if (this.data.tripId > 0) {
      this.isEditMode = true;
      this.getTripData(this.data.tripId);
    }
  }

  createLoginForm() {
    this.form = this.fb.group({
      tripId: [null],
      vehicleId: [null, [Validators.required]],
      driverId: [null, [Validators.required]],
      origin: [null, [Validators.required]],
      destination: [null, [Validators.required]],
      startTime: [new Date(), [Validators.required]],
      endTime: [null, [Validators.required]],
      status: [TripStatus.Planned, [Validators.required]],
    });
  }

  getDropdownList() {
    this.tripService.getTripOptionList().subscribe({
      next: (res) => {
        if (res.result) {
          this.driverOption = res.data.drivers;
          this.vehicleOption = res.data.vehicles;
        }
      },
    });
  }

  getTripData(tripId: number) {
    this.tripService.getSingleTrip(tripId).subscribe({
      next: (res) => {
        if (res.result) {
          this.form.patchValue(res.data);
        }
      },
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.tripService.upsertTrip(this.form.value).subscribe({
        next: (res) => {
          if (res.result) {
            this.snackbar.success(res.message);
            this.dialogRef.close(true);
          } else {
            this.snackbar.error(res.message);
          }
        },
      });
    }
  }
}
