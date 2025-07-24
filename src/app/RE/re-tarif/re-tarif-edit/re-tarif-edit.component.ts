import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RETarifFormComponent } from '../forms/re-tarif-form.component';
import { RETarifService } from '../services/re-tarif.service';
import { RETarifEntity } from '../re-tarif.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-re-tarif-edit',
  imports: [
    ErrorMessagesComponent,
    RETarifFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './re-tarif-edit.component.html',
  styleUrl: './re-tarif-edit.component.css'
})
export class RETarifEditComponent {
  @ViewChild(RETarifFormComponent) rETarifForm!: RETarifFormComponent;

  id = signal<number>(1);
  rETarif = signal<RETarifEntity|null>(null)
  
  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected rETarifService: RETarifService,
    
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
      const rETarifResponse = await this.rETarifService.getById(this.id())
      const rETarifData = rETarifResponse.data as RETarifEntity;

      this.rETarif.set(rETarifData);
      this.rETarifForm.fill(rETarifData);

      
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async handleFormSubmit (e: Event) {
    e.preventDefault();

    this.isLoading.set(true);
    this.rETarifForm.formGroup.setErrors([]);
    this.errorHandler.setErrorMessages([]);

    try {
      await this.rETarifForm.update(this.id());
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}