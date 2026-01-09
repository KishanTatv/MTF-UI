import { CommonModule } from '@angular/common';
import { Component, input, output, AfterViewChecked, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ValidatorService } from '../../services/validator-service';
import {
  FormControlModel,
  ISelectOptionModel,
} from '../../interface/form-control.interface';

@Component({
  selector: 'app-select-control',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatAutocompleteModule,
    CommonModule,
  ],
  templateUrl: './select-control.html',
  styleUrl: './select-control.scss',
})
export class SelectControl implements AfterViewChecked {
  formControlModel = input.required<FormControlModel>();
  form = input.required<FormGroup>();
  class = input<string>('');
  selected = input<string | number | null>(null);
  dynamicHeight = input<boolean>(false);
  options = input<ISelectOptionModel[] | null>([]);
  selection = output<void>();
  optionClick = output<string | number>();
  enableSearch = input<boolean>(false);
  showDefaultOption = input<boolean>(false);
  defaultText = input<string>('--- Select ---');
  isMultiple = input<boolean>(false);
  searchTerm = '';
  _validator = inject(ValidatorService);

  getOptions() {
    const formControlModel = this.options();
    if (formControlModel) {
      return formControlModel;
    }
    return [];
  }

  getFilteredOptions() {
    return this.options()?.filter((x: ISelectOptionModel) =>
      x.value.toLocaleString().toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  ngAfterViewChecked() {
    document
      .querySelector('.disable-select > .mdc-text-field--disabled')
      ?.classList.remove('mdc-text-field--disabled');
  }

  filterOptions(value: string) {
    this.searchTerm = value;
    this.getFilteredOptions();
  }
}
