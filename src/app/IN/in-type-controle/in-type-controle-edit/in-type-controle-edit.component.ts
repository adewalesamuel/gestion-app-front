import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { INTypeControleFormComponent } from '../forms/in-type-controle-form.component';
import { INTypeControleService } from '../services/in-type-controle.service';
import { INTypeControleEntity } from '../in-type-controle.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-in-type-controle-edit',
  imports: [
    ErrorMessagesComponent,
    INTypeControleFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './in-type-controle-edit.component.html',
  styleUrl: './in-type-controle-edit.component.css'
})
export class INTypeControleEditComponent {
  @ViewChild(INTypeControleFormComponent) iNTypeControleForm!: INTypeControleFormComponent;

  id = signal<number>(1);
  iNTypeControle = signal<INTypeControleEntity|null>(null)
  
  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected iNTypeControleService: INTypeControleService,
    
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
      const iNTypeControleResponse = await this.iNTypeControleService.getById(this.id())
      const iNTypeControleData = iNTypeControleResponse.data as INTypeControleEntity;

      this.iNTypeControle.set(iNTypeControleData);
      this.iNTypeControleForm.fill(iNTypeControleData);

      
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async handleFormSubmit (e: Event) {
    e.preventDefault();

    this.isLoading.set(true);
    this.iNTypeControleForm.formGroup.setErrors([]);
    this.errorHandler.setErrorMessages([]);

    try {
      await this.iNTypeControleForm.update(this.id());
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}