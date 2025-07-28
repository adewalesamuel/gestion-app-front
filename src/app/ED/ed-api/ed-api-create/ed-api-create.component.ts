import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EDApiFormComponent } from '../forms/ed-api-form.component';
import { EDApiService } from '../services/ed-api.service';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-ed-api-create',
  imports: [
    ErrorMessagesComponent,
    EDApiFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './ed-api-create.component.html',
  styleUrl: './ed-api-create.component.css'
})
export class EDApiCreateComponent {

  @ViewChild(EDApiFormComponent) eDApiForm!: EDApiFormComponent;


  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected eDApiService: EDApiService,

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
    this.eDApiForm.formGroup.setErrors([]);

    try {
      await this.eDApiForm.create();
      this.router.navigate([`/ed/ed-apis`]);
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
