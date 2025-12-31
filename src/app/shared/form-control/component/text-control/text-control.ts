import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InputTrim } from '../../../directive/input-trim';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { FormControlModel } from '../../interface/form-control.interface';
import { ValidatorService } from '../../services/validator-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-text-control',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    InputTrim,
    MatButtonModule,
    MatTooltipModule,
    MatRippleModule,
  ],
  templateUrl: './text-control.html',
  styleUrl: './text-control.scss',
})
export class TextControl {
  formControlModel = input.required<FormControlModel>();
  form = input.required<FormGroup>();
  class = input<string>('');
  isDisable = input<boolean>(false);
  dynamicHeight = input<boolean>(false);
  autocomplete = input<MatAutocomplete>();
  errorLength = input<number>(0);
  inputChange = output<string>();
  inputBlur = output<void>();
  enterInput = output<void>();
  iconClick = output<Event>();
  // matIcons = MatIcons;

  constructor(public _validator: ValidatorService) {}

  onIconClick(event: Event) {
    this.iconClick.emit(event);
  }

  get errorText(): string {
    return (
      this._validator.getError(
        this.form(),
        this.formControlModel().key,
        this.formControlModel()
      ) || ''
    );
  }

  onChange(event: Event) {
    const data = event?.target as HTMLInputElement;
    this.inputChange.emit(data.value);
  }

  onFieldBlur() {
    this.inputBlur.emit();
  }

  onEnter() {
    this.enterInput.emit();
  }
}
