import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { ValidatorService } from '../../services/validator-service';
import { FormControlModel } from '../../interface/form-control.interface';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { specificDateFormats } from '../../../common/constant';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

export const MY_FORMATS = {
  parse: {
    dateInput: specificDateFormats.DD_MM_YYYY,
  },
  display: {
    dateInput: specificDateFormats.DD_MM_YYYY,
    monthYearLabel: specificDateFormats.MMM_YYYY,
    dateA11yLabel: 'LL',
    monthYearA11yLabel: specificDateFormats.MMMM_YYYY,
  },
};

@Component({
  selector: 'app-date-picker',
  imports: [
    MatError,
    MatTooltipModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  providers: [provideMomentDateAdapter(MY_FORMATS)],
  templateUrl: './date-picker.html',
  styleUrl: './date-picker.scss',
})
export class DatePicker {
  @Input() formControlModel!: FormControlModel;
  @Input() form!: FormGroup;
  @Input() class = '';
  @Input() min!: Date;
  @Input() max!: Date;
  @Input() disabledDates: Date[] = [];
  @Input() dynamicHeight: boolean = false;
  @Output() inputChange = new EventEmitter<string>();

  constructor(public _validator: ValidatorService) {}

  dateChange(event: MatDatepickerInputEvent<any, any>) {
    const selectedDate = event.value;
    const formattedDate: string = selectedDate
      ? new Date(selectedDate).toLocaleDateString('sv-SE')
      : selectedDate;
    this.inputChange.emit(formattedDate);
  }

  dateFilter1 = (date: Date | null): boolean => {
    if (!date) return true;
    return !this.disabledDates.some((disabledDate) =>
      this.isSameDate1(disabledDate, new Date(date))
    );
  };

  private isSameDate1(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  get errorText(): string {
    return (
      this._validator.getError(
        this.form,
        this.formControlModel.key,
        this.formControlModel
      ) || ''
    );
  }
}
