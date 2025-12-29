import { Component, Input, input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {
  NgxMatDatepickerInput,
  NgxMatDatetimepicker,
} from '@ngxmc/datetime-picker';
import { MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

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
    MatIconModule,
  ],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: DATE_TIME_FORMATS }],
  templateUrl: './date-time-picker.html',
  styleUrl: './date-time-picker.scss',
})
export class DateTimePicker {
  @Input() form: FormGroup;
  @Input() minDate = new Date(2020, 0, 1);
  @Input() maxDate = new Date(2030, 11, 31);
  touchUi = false;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      datetime: [new Date(), [Validators.required]],
    });
  }
}
