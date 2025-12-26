import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
export class SelectControl {
  @Input() formControlModel!: FormControlModel;
  @Input() form!: FormGroup;
  @Input() class = '';
  @Input() selected: string | number | null | string[] | number[] = null;
  @Input() dynamicHeight: boolean = false;
  @Input() options: ISelectOptionModel[] | null = [];
  @Output() selection = new EventEmitter();
  @Output() optionClick = new EventEmitter();
  @Input() enableSearch: boolean = false;
  @Input() showDefaultOption: boolean = false;
  @Input() defaultText: string = '--- Select ---';
  @Input() isMultiple: boolean = false;
  searchTerm: string = '';
  constructor(public _validator: ValidatorService) {}

  getOptions() {
    const formControlModel = this.options;
    if (formControlModel) {
      return formControlModel;
    }
    return [];
  }

  getFilteredOptions() {
    return this.options?.filter((x: any) =>
      x.value.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  ngAfterViewChecked() {
    document
      .querySelector('.disable-select > .mdc-text-field--disabled')
      ?.classList.remove('mdc-text-field--disabled');
  }

  filterOptions(e: any) {
    this.searchTerm = e.target.value;
    this.getFilteredOptions();
  }
}
