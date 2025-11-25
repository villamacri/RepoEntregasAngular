import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-custom-progress-bar-component',
  imports: [NgClass],
  templateUrl: './custom-progress-bar-component.html',
  styleUrl: './custom-progress-bar-component.css',
})
export class CustomProgressBarComponent {
  @Input() valor: number = 50;

  @Input() color: string = 'primary';

  @Input() striped: boolean = true;

  @Input() showText: boolean = true;
}
