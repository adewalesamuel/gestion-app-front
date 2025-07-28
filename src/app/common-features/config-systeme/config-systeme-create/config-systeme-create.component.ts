import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigSystemeFormComponent } from '../forms/config-systeme-form.component';
import { ConfigSystemeService } from '../services/config-systeme.service';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-config-systeme-create',
  imports: [
    ErrorMessagesComponent,
    ConfigSystemeFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './config-systeme-create.component.html',
  styleUrl: './config-systeme-create.component.css'
})
export class ConfigSystemeCreateComponent {

  @ViewChild(ConfigSystemeFormComponent) configSystemeForm!: ConfigSystemeFormComponent;


  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected configSystemeService: ConfigSystemeService,

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
    this.configSystemeForm.formGroup.setErrors([]);

    try {
      await this.configSystemeForm.create();
      this.router.navigate([`/settings/config-systemes`]);
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
