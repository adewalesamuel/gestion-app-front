import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GUTypeDemandeFormComponent } from '../forms/gu-type-demande-form.component';
import { GUTypeDemandeService } from '../services/gu-type-demande.service';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-gu-type-demande-create',
  imports: [
    ErrorMessagesComponent,
    GUTypeDemandeFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './gu-type-demande-create.component.html',
  styleUrl: './gu-type-demande-create.component.css'
})
export class GUTypeDemandeCreateComponent {

  @ViewChild(GUTypeDemandeFormComponent) gUTypeDemandeForm!: GUTypeDemandeFormComponent;

  
  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected gUTypeDemandeService: GUTypeDemandeService,
    
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
    this.gUTypeDemandeForm.formGroup.setErrors([]);

    try {
      await this.gUTypeDemandeForm.create();
      this.router.navigate([`/gu-type-demandes`]);
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}