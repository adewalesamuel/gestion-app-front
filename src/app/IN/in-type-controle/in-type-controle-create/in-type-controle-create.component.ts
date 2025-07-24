import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { INTypeControleFormComponent } from '../forms/in-type-controle-form.component';
import { INTypeControleService } from '../services/in-type-controle.service';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-in-type-controle-create',
  imports: [
    ErrorMessagesComponent,
    INTypeControleFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './in-type-controle-create.component.html',
  styleUrl: './in-type-controle-create.component.css'
})
export class INTypeControleCreateComponent {

  @ViewChild(INTypeControleFormComponent) iNTypeControleForm!: INTypeControleFormComponent;

  
  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected iNTypeControleService: INTypeControleService,
    
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
    this.iNTypeControleForm.formGroup.setErrors([]);

    try {
      await this.iNTypeControleForm.create();
      this.router.navigate([`/in-type-controles`]);
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}