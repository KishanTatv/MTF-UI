import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() color: 'flat' | 'stroked' | 'raised' = 'flat';
  @Input() type = 'button';
  @Input() tooltip = '';
  @Input() isDisabled = false;
  @Input() label!: string;
  @Input() class = '';
  @Input() id: string = '';
  @Input() icon: string = '';
  @Output() btnClick = new EventEmitter<Event>();
  isHover: boolean = false;
  width = window.screen.width;

  onClick(event: Event) {
    this.btnClick.emit(event);
  }
}
