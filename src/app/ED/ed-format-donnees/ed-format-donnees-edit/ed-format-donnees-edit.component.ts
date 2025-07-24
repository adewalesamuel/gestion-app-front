import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EDFormatDonneesFormComponent } from '../forms/ed-format-donnees-form.component';
import { EDFormatDonneesService } from '../services/ed-format-donnees.service';
import { EDFormatDonneesEntity } from '../ed-format-donnees.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-ed-format-donnees-edit',
  imports: [
    ErrorMessagesComponent,
    EDFormatDonneesFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './ed-format-donnees-edit.component.html',
  styleUrl: './ed-format-donnees-edit.component.css'
})
export class EDFormatDonneesEditComponent {
  @ViewChild(EDFormatDonneesFormComponent) eDFormatDonneesForm!: EDFormatDonneesFormComponent;

  id = signal<number>(1);
  eDFormatDonnees = signal<EDFormatDonneesEntity|null>(null)
  
  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected eDFormatDonneesService: EDFormatDonneesService,
    
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
      const eDFormatDonneesResponse = await this.eDFormatDonneesService.getById(this.id())
      const eDFormatDonneesData = eDFormatDonneesResponse.data as EDFormatDonneesEntity;

      this.eDFormatDonnees.set(eDFormatDonneesData);
      this.eDFormatDonneesForm.fill(eDFormatDonneesData);

      
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async handleFormSubmit (e: Event) {
    e.preventDefault();

    this.isLoading.set(true);
    this.eDFormatDonneesForm.formGroup.setErrors([]);
    this.errorHandler.setErrorMessages([]);

    try {
      await this.eDFormatDonneesForm.update(this.id());
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}