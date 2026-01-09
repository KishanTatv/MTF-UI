import { Component, inject, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {
  NgxMatDatepickerInput,
  NgxMatDatetimepicker,
} from '@ngxmc/datetime-picker';
import { MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import {
  MatMomentDateModule,
  provideMomentDateAdapter,
} from '@angular/material-moment-adapter';
import { FormControlModel } from '../../interface/form-control.interface';
import { ValidatorService } from '../../services/validator-service';
import { MatTooltipModule } from '@angular/material/tooltip';

export const DATE_TIME_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'dd-MM-YYYY HH:mm',
  },
  display: {
    dateInput: 'DD-MM-yyyy HH:mm',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'dd-MM-yyyy',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};

@Component({
  selector: 'app-date-time-picker',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatMomentDateModule,
    MatInputModule,
    MatButtonModule,
    NgxMatDatetimepicker,
    NgxMatDatepickerInput,
    MatTooltipModule,
    MatIconModule,
    MatError,
  ],
  providers: [
    provideMomentDateAdapter(),
    { provide: MAT_DATE_FORMATS, useValue: DATE_TIME_FORMATS },
  ],
  templateUrl: './date-time-picker.html',
  styleUrl: './date-time-picker.scss',
})
export class DateTimePicker {
  formControlModel = input.required<FormControlModel>();
  form = input.required<FormGroup>();
  class = input<string>();
  dynamicHeight = input<boolean>(false);
  min = input<Date | null>(null);
  max = input<Date | null>(null);
  touchUi = false;

  private readonly _validator = inject(ValidatorService);

  get errorText(): string {
    return (
      this._validator.getError(
        this.form(),
        this.formControlModel().key,
        this.formControlModel()
      ) || ''
    );
  }
}
