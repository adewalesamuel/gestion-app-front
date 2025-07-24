import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigSystemeFormComponent } from '../forms/config-systeme-form.component';
import { ConfigSystemeService } from '../services/config-systeme.service';
import { ConfigSystemeEntity } from '../config-systeme.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-config-systeme-edit',
  imports: [
    ErrorMessagesComponent,
    ConfigSystemeFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './config-systeme-edit.component.html',
  styleUrl: './config-systeme-edit.component.css'
})
export class ConfigSystemeEditComponent {
  @ViewChild(ConfigSystemeFormComponent) configSystemeForm!: ConfigSystemeFormComponent;

  id = signal<number>(1);
  configSysteme = signal<ConfigSystemeEntity|null>(null)
  
  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected configSystemeService: ConfigSystemeService,
    
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
      const configSystemeResponse = await this.configSystemeService.getById(this.id())
      const configSystemeData = configSystemeResponse.data as ConfigSystemeEntity;

      this.configSysteme.set(configSystemeData);
      this.configSystemeForm.fill(configSystemeData);

      
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async handleFormSubmit (e: Event) {
    e.preventDefault();

    this.isLoading.set(true);
    this.configSystemeForm.formGroup.setErrors([]);
    this.errorHandler.setErrorMessages([]);

    try {
      await this.configSystemeForm.update(this.id());
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}