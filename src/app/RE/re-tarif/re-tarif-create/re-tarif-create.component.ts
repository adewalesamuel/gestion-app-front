import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RETarifFormComponent } from '../forms/re-tarif-form.component';
import { RETarifService } from '../services/re-tarif.service';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-re-tarif-create',
  imports: [
    ErrorMessagesComponent,
    RETarifFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './re-tarif-create.component.html',
  styleUrl: './re-tarif-create.component.css'
})
export class RETarifCreateComponent {

  @ViewChild(RETarifFormComponent) rETarifForm!: RETarifFormComponent;


  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected rETarifService: RETarifService,

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
    this.rETarifForm.formGroup.setErrors([]);

    try {
      await this.rETarifForm.create();
      this.router.navigate([`/re/re-tarifs`]);
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
