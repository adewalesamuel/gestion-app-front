import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RCCertificatFormComponent } from '../forms/rc-certificat-form.component';
import { RCCertificatService } from '../services/rc-certificat.service';
import { RCEnginFlottantService } from '../../rc-engin-flottant/services/rc-engin-flottant.service';
import { RCEnginFlottantEntity } from '../../rc-engin-flottant/rc-engin-flottant.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-rc-certificat-create',
  imports: [
    ErrorMessagesComponent,
    RCCertificatFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './rc-certificat-create.component.html',
  styleUrl: './rc-certificat-create.component.css'
})
export class RCCertificatCreateComponent {

  @ViewChild(RCCertificatFormComponent) rCCertificatForm!: RCCertificatFormComponent;

  rcEnginFlottants = signal<RCEnginFlottantEntity[]>([]);

  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected rCCertificatService: RCCertificatService,
    protected rcEnginFlottantService: RCEnginFlottantService,

  ) {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.init();
  }

  async init() {
    this.isLoading.set(true);

    try {
      const rcEnginFlottantResponse = await this.rcEnginFlottantService.getAll({page: ''});
			const rcEnginFlottantData = rcEnginFlottantResponse.data as RCEnginFlottantEntity[];
			this.rcEnginFlottants.set(rcEnginFlottantData);


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
    this.rCCertificatForm.formGroup.setErrors([]);

    try {
      await this.rCCertificatForm.create();
      this.router.navigate([`/rc/rc-certificats`]);
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
