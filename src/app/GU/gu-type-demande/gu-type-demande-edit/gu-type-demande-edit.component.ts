import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GUTypeDemandeFormComponent } from '../forms/gu-type-demande-form.component';
import { GUTypeDemandeService } from '../services/gu-type-demande.service';
import { GUTypeDemandeEntity } from '../gu-type-demande.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-gu-type-demande-edit',
  imports: [
    ErrorMessagesComponent,
    GUTypeDemandeFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './gu-type-demande-edit.component.html',
  styleUrl: './gu-type-demande-edit.component.css'
})
export class GUTypeDemandeEditComponent {
  @ViewChild(GUTypeDemandeFormComponent) gUTypeDemandeForm!: GUTypeDemandeFormComponent;

  id = signal<number>(1);
  gUTypeDemande = signal<GUTypeDemandeEntity|null>(null)
  
  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected gUTypeDemandeService: GUTypeDemandeService,
    
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
      const gUTypeDemandeResponse = await this.gUTypeDemandeService.getById(this.id())
      const gUTypeDemandeData = gUTypeDemandeResponse.data as GUTypeDemandeEntity;

      this.gUTypeDemande.set(gUTypeDemandeData);
      this.gUTypeDemandeForm.fill(gUTypeDemandeData);

      
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async handleFormSubmit (e: Event) {
    e.preventDefault();

    this.isLoading.set(true);
    this.gUTypeDemandeForm.formGroup.setErrors([]);
    this.errorHandler.setErrorMessages([]);

    try {
      await this.gUTypeDemandeForm.update(this.id());
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}