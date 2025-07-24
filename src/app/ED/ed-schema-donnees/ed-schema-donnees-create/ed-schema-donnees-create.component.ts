import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EDSchemaDonneesFormComponent } from '../forms/ed-schema-donnees-form.component';
import { EDSchemaDonneesService } from '../services/ed-schema-donnees.service';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-ed-schema-donnees-create',
  imports: [
    ErrorMessagesComponent,
    EDSchemaDonneesFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './ed-schema-donnees-create.component.html',
  styleUrl: './ed-schema-donnees-create.component.css'
})
export class EDSchemaDonneesCreateComponent {

  @ViewChild(EDSchemaDonneesFormComponent) eDSchemaDonneesForm!: EDSchemaDonneesFormComponent;

  
  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected eDSchemaDonneesService: EDSchemaDonneesService,
    
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
    this.eDSchemaDonneesForm.formGroup.setErrors([]);

    try {
      await this.eDSchemaDonneesForm.create();
      this.router.navigate([`/ed-schema-donneess`]);
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}