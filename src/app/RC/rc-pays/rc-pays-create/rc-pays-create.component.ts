import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RCPaysFormComponent } from '../forms/rc-pays-form.component';
import { RCPaysService } from '../services/rc-pays.service';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-rc-pays-create',
  imports: [
    ErrorMessagesComponent,
    RCPaysFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './rc-pays-create.component.html',
  styleUrl: './rc-pays-create.component.css'
})
export class RCPaysCreateComponent {

  @ViewChild(RCPaysFormComponent) rCPaysForm!: RCPaysFormComponent;


  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected rCPaysService: RCPaysService,

  ) {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.init();
  }

  async init() {
    this.isLoading.set(true);

    try {

    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async handleFormSubmit (e: Event) {
    e.preventDefault();

    this.errorHandler.setErrorMessages([]);
    this.isLoading.set(true);
    this.rCPaysForm.formGroup.setErrors([]);

    try {
      await this.rCPaysForm.create();
      this.router.navigate([`/rc/rc-payss`]);
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
