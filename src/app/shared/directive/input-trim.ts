import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appInputTrim]',
})
export class InputTrim {
  appTrimLeadingZeroes = input<boolean | undefined>(false);
  defaultZero = input<boolean | undefined>(false);
  private readonly el = inject(ElementRef);
  private readonly ngControl = inject(NgControl);

  @HostListener('blur')
  onBlur() {
    const input = this.el.nativeElement as HTMLInputElement;
    let trimmedValue = input.value.trim();

    // Remove leading zeroes if flag is true
    if (this.appTrimLeadingZeroes()) {
      trimmedValue = trimmedValue.replace(/^0+(\d)/, '$1');
    }
    if (this.defaultZero() && trimmedValue === '') {
      trimmedValue = '0';
    }

    input.value = trimmedValue;

    if (this.ngControl?.control) {
      this.ngControl.control.setValue(trimmedValue, { emitEvent: false });
    }
  }
}
