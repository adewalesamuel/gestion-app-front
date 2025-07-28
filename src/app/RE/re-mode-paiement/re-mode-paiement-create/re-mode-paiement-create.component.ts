import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { REModePaiementFormComponent } from '../forms/re-mode-paiement-form.component';
import { REModePaiementService } from '../services/re-mode-paiement.service';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-re-mode-paiement-create',
  imports: [
    ErrorMessagesComponent,
    REModePaiementFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './re-mode-paiement-create.component.html',
  styleUrl: './re-mode-paiement-create.component.css'
})
export class REModePaiementCreateComponent {

  @ViewChild(REModePaiementFormComponent) rEModePaiementForm!: REModePaiementFormComponent;


  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected rEModePaiementService: REModePaiementService,

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
    this.rEModePaiementForm.formGroup.setErrors([]);

    try {
      await this.rEModePaiementForm.create();
      this.router.navigate([`/re/re-mode-paiements`]);
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
