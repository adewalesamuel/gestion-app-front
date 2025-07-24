import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-messages',
  imports: [],
  templateUrl: './error-messages.component.html',
  styleUrl: './error-messages.component.css'
})
export class ErrorMessagesComponent {
  @Input() errorMessages!: string[];
}
