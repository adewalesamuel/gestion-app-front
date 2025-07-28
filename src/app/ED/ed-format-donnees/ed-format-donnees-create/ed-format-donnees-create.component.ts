import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EDFormatDonneesFormComponent } from '../forms/ed-format-donnees-form.component';
import { EDFormatDonneesService } from '../services/ed-format-donnees.service';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-ed-format-donnees-create',
  imports: [
    ErrorMessagesComponent,
    EDFormatDonneesFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './ed-format-donnees-create.component.html',
  styleUrl: './ed-format-donnees-create.component.css'
})
export class EDFormatDonneesCreateComponent {

  @ViewChild(EDFormatDonneesFormComponent) eDFormatDonneesForm!: EDFormatDonneesFormComponent;


  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected eDFormatDonneesService: EDFormatDonneesService,

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
    this.eDFormatDonneesForm.formGroup.setErrors([]);

    try {
      await this.eDFormatDonneesForm.create();
      this.router.navigate([`/ed/ed-format-donneess`]);
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
