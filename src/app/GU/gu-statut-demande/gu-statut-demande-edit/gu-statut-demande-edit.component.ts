import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GUStatutDemandeFormComponent } from '../forms/gu-statut-demande-form.component';
import { GUStatutDemandeService } from '../services/gu-statut-demande.service';
import { GUStatutDemandeEntity } from '../gu-statut-demande.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-gu-statut-demande-edit',
  imports: [
    ErrorMessagesComponent,
    GUStatutDemandeFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './gu-statut-demande-edit.component.html',
  styleUrl: './gu-statut-demande-edit.component.css'
})
export class GUStatutDemandeEditComponent {
  @ViewChild(GUStatutDemandeFormComponent) gUStatutDemandeForm!: GUStatutDemandeFormComponent;

  id = signal<number>(1);
  gUStatutDemande = signal<GUStatutDemandeEntity|null>(null)
  
  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected gUStatutDemandeService: GUStatutDemandeService,
    
  ) {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.route.params.subscribe(async params => {
      this.id.set(Number(params['id']));
      this.init();
    });
  }

  async init() {
    this.isLoading.set(true);

    try {
      const gUStatutDemandeResponse = await this.gUStatutDemandeService.getById(this.id())
      const gUStatutDemandeData = gUStatutDemandeResponse.data as GUStatutDemandeEntity;

      this.gUStatutDemande.set(gUStatutDemandeData);
      this.gUStatutDemandeForm.fill(gUStatutDemandeData);

      
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async handleFormSubmit (e: Event) {
    e.preventDefault();

    this.isLoading.set(true);
    this.gUStatutDemandeForm.formGroup.setErrors([]);
    this.errorHandler.setErrorMessages([]);

    try {
      await this.gUStatutDemandeForm.update(this.id());
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}