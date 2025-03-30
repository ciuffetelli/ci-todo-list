import { NgIf } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [NgIf],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  message = input<string | null>(null);
  variations = input('info');
}
