import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GUStatutDemandeFormComponent } from '../forms/gu-statut-demande-form.component';
import { GUStatutDemandeService } from '../services/gu-statut-demande.service';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-gu-statut-demande-create',
  imports: [
    ErrorMessagesComponent,
    GUStatutDemandeFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './gu-statut-demande-create.component.html',
  styleUrl: './gu-statut-demande-create.component.css'
})
export class GUStatutDemandeCreateComponent {

  @ViewChild(GUStatutDemandeFormComponent) gUStatutDemandeForm!: GUStatutDemandeFormComponent;


  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected gUStatutDemandeService: GUStatutDemandeService,

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
    this.gUStatutDemandeForm.formGroup.setErrors([]);

    try {
      await this.gUStatutDemandeForm.create();
      this.router.navigate([`/gu/gu-statut-demandes`]);
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
