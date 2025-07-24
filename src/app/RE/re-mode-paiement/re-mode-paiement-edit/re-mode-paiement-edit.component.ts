import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { REModePaiementFormComponent } from '../forms/re-mode-paiement-form.component';
import { REModePaiementService } from '../services/re-mode-paiement.service';
import { REModePaiementEntity } from '../re-mode-paiement.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-re-mode-paiement-edit',
  imports: [
    ErrorMessagesComponent,
    REModePaiementFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './re-mode-paiement-edit.component.html',
  styleUrl: './re-mode-paiement-edit.component.css'
})
export class REModePaiementEditComponent {
  @ViewChild(REModePaiementFormComponent) rEModePaiementForm!: REModePaiementFormComponent;

  id = signal<number>(1);
  rEModePaiement = signal<REModePaiementEntity|null>(null)
  
  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected rEModePaiementService: REModePaiementService,
    
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
      const rEModePaiementResponse = await this.rEModePaiementService.getById(this.id())
      const rEModePaiementData = rEModePaiementResponse.data as REModePaiementEntity;

      this.rEModePaiement.set(rEModePaiementData);
      this.rEModePaiementForm.fill(rEModePaiementData);

      
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async handleFormSubmit (e: Event) {
    e.preventDefault();

    this.isLoading.set(true);
    this.rEModePaiementForm.formGroup.setErrors([]);
    this.errorHandler.setErrorMessages([]);

    try {
      await this.rEModePaiementForm.update(this.id());
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}