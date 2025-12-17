import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appInputTrim]',
})
export class InputTrim {
  @Input() appTrimLeadingZeroes: boolean | undefined = false;
  @Input() defaultZero: boolean | undefined = false;

  constructor(private el: ElementRef, private ngControl: NgControl) {}

  @HostListener('blur', ['$event'])
  onBlur(event: Event) {
    const input = this.el.nativeElement as HTMLInputElement;
    let trimmedValue = input.value.trim();

    // Remove leading zeroes if flag is true
    if (this.appTrimLeadingZeroes) {
      trimmedValue = trimmedValue.replace(/^0+(\d)/, '$1');
    }
    if (this.defaultZero && trimmedValue === '') {
      trimmedValue = '0';
    }

    input.value = trimmedValue;

    if (this.ngControl?.control) {
      this.ngControl.control.setValue(trimmedValue, { emitEvent: false });
    }
  }
}
