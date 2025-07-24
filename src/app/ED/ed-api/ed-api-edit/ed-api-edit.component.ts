import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EDApiFormComponent } from '../forms/ed-api-form.component';
import { EDApiService } from '../services/ed-api.service';
import { EDApiEntity } from '../ed-api.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-ed-api-edit',
  imports: [
    ErrorMessagesComponent,
    EDApiFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './ed-api-edit.component.html',
  styleUrl: './ed-api-edit.component.css'
})
export class EDApiEditComponent {
  @ViewChild(EDApiFormComponent) eDApiForm!: EDApiFormComponent;

  id = signal<number>(1);
  eDApi = signal<EDApiEntity|null>(null)
  
  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected eDApiService: EDApiService,
    
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
      const eDApiResponse = await this.eDApiService.getById(this.id())
      const eDApiData = eDApiResponse.data as EDApiEntity;

      this.eDApi.set(eDApiData);
      this.eDApiForm.fill(eDApiData);

      
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async handleFormSubmit (e: Event) {
    e.preventDefault();

    this.isLoading.set(true);
    this.eDApiForm.formGroup.setErrors([]);
    this.errorHandler.setErrorMessages([]);

    try {
      await this.eDApiForm.update(this.id());
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}