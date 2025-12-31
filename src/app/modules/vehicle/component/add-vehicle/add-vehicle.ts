import { Component, inject } from '@angular/core';
import { SnackBar } from '../../../../shared/service/snackbar/snack-bar';
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
import { VehicleService } from '../../service/vehicle-service';
import { vehicleControl, vehicleTypeOption } from '../../config/vehicle.config';
import { TextControl } from '../../../../shared/form-control/component/text-control/text-control';
import { Button } from '../../../../shared/form-control/component/button/button';
import { DatePicker } from '../../../../shared/form-control/component/date-picker/date-picker';
import { SelectControl } from '../../../../shared/form-control/component/select-control/select-control';
import { validation } from '../../../../shared/common/constant';

@Component({
  selector: 'app-add-vehicle',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    Button,
    TextControl,
    DatePicker,
    SelectControl,
  ],
  templateUrl: './add-vehicle.html',
  styleUrl: './add-vehicle.scss',
})
export class AddVehicle {
  form!: FormGroup;
  addVehicleControl = vehicleControl;
  vehicleTypeOption = vehicleTypeOption;
  readonly dialogRef = inject(MatDialogRef<AddVehicle>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private snackbar: SnackBar
  ) {}
  ngOnInit(): void {
    this.createForm();
    if (this.data.vehicleId > 0) {
      this.isEditMode = true;
      this.getVehicleData(this.data.vehicleId);
    }
  }

  createForm() {
    this.form = this.fb.group({
      vehicleId: [null],
      licensePlate: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
          Validators.pattern(validation.common.licensePlateREGEX),
        ],
      ],
      vin: [
        null,
        [
          Validators.required,
          Validators.minLength(17),
          Validators.maxLength(17),
          Validators.pattern(validation.common.vinREGEX),
        ],
      ],
      model: [
        null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      type: [null, [Validators.required]],
      capacity: [
        null,
        [Validators.required, Validators.min(1), Validators.max(100000)],
      ],
      insuranceNumber: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
          Validators.pattern(validation.common.insuranceNoREGEX),
        ],
      ],
      insuranceExpiry: [null, [Validators.required]],
    });
  }

  getVehicleData(vehicleId: number) {
    this.vehicleService.getSingleVehicleList(vehicleId).subscribe({
      next: (res) => {
        if (res.result) {
          this.form.patchValue(res.data);
        }
      },
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.vehicleService.upsertVehicle(this.form.value).subscribe({
        next: (res) => {
          if (res.result) {
            this.snackbar.success(res.message);
            this.dialogRef.close(true);
          } else {
            this.snackbar.error(res.message);
          }
        },
        error: (err) => {},
      });
    }
  }
}
