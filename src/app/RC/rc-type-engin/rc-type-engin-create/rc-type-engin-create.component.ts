import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RCTypeEnginFormComponent } from '../forms/rc-type-engin-form.component';
import { RCTypeEnginService } from '../services/rc-type-engin.service';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-rc-type-engin-create',
  imports: [
    ErrorMessagesComponent,
    RCTypeEnginFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './rc-type-engin-create.component.html',
  styleUrl: './rc-type-engin-create.component.css'
})
export class RCTypeEnginCreateComponent {

  @ViewChild(RCTypeEnginFormComponent) rCTypeEnginForm!: RCTypeEnginFormComponent;

  
  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected rCTypeEnginService: RCTypeEnginService,
    
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
    this.rCTypeEnginForm.formGroup.setErrors([]);

    try {
      await this.rCTypeEnginForm.create();
      this.router.navigate([`/rc-type-engins`]);
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}