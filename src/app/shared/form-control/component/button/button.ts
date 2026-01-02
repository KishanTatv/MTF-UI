import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-button',
  imports: [MatButtonModule, MatIconModule, CommonModule, MatTooltipModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  color = input<'flat' | 'stroked' | 'raised'>('flat');
  type = input<string>('button');
  tooltip = input<string>('');
  isDisabled = input<boolean>(false);
  label = input<string>();
  class = input<string>('');
  id = input<string>();
  icon = input<string>();
  btnClick = output<Event>();
  isHover = false;
  width = window.screen.width;

  onClick(event: Event) {
    this.btnClick.emit(event);
  }
}
