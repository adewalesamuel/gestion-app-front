import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EDSchemaDonneesFormComponent } from '../forms/ed-schema-donnees-form.component';
import { EDSchemaDonneesService } from '../services/ed-schema-donnees.service';
import { EDSchemaDonneesEntity } from '../ed-schema-donnees.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-ed-schema-donnees-edit',
  imports: [
    ErrorMessagesComponent,
    EDSchemaDonneesFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './ed-schema-donnees-edit.component.html',
  styleUrl: './ed-schema-donnees-edit.component.css'
})
export class EDSchemaDonneesEditComponent {
  @ViewChild(EDSchemaDonneesFormComponent) eDSchemaDonneesForm!: EDSchemaDonneesFormComponent;

  id = signal<number>(1);
  eDSchemaDonnees = signal<EDSchemaDonneesEntity|null>(null)
  
  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected eDSchemaDonneesService: EDSchemaDonneesService,
    
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
      const eDSchemaDonneesResponse = await this.eDSchemaDonneesService.getById(this.id())
      const eDSchemaDonneesData = eDSchemaDonneesResponse.data as EDSchemaDonneesEntity;

      this.eDSchemaDonnees.set(eDSchemaDonneesData);
      this.eDSchemaDonneesForm.fill(eDSchemaDonneesData);

      
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async handleFormSubmit (e: Event) {
    e.preventDefault();

    this.isLoading.set(true);
    this.eDSchemaDonneesForm.formGroup.setErrors([]);
    this.errorHandler.setErrorMessages([]);

    try {
      await this.eDSchemaDonneesForm.update(this.id());
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}