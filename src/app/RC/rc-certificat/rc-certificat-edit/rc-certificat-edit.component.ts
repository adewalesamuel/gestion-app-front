import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RCCertificatFormComponent } from '../forms/rc-certificat-form.component';
import { RCCertificatService } from '../services/rc-certificat.service';
import { RCCertificatEntity } from '../rc-certificat.entity';
import { RCEnginFlottantService } from '../../../RC/rc-engin-flottant/services/rc-engin-flottant.service';
import { RCEnginFlottantEntity } from '../../../RC/rc-engin-flottant/rc-engin-flottant.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-rc-certificat-edit',
  imports: [
    ErrorMessagesComponent,
    RCCertificatFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './rc-certificat-edit.component.html',
  styleUrl: './rc-certificat-edit.component.css'
})
export class RCCertificatEditComponent {
  @ViewChild(RCCertificatFormComponent) rCCertificatForm!: RCCertificatFormComponent;

  id = signal<number>(1);
  rCCertificat = signal<RCCertificatEntity|null>(null)
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

    this.route.params.subscribe(async params => {
      this.id.set(Number(params['id']));
      this.init();
    });
  }

  async init() {
    this.isLoading.set(true);

    try {
      const rCCertificatResponse = await this.rCCertificatService.getById(this.id())
      const rCCertificatData = rCCertificatResponse.data as RCCertificatEntity;

      this.rCCertificat.set(rCCertificatData);
      this.rCCertificatForm.fill(rCCertificatData);

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

    this.isLoading.set(true);
    this.rCCertificatForm.formGroup.setErrors([]);
    this.errorHandler.setErrorMessages([]);

    try {
      await this.rCCertificatForm.update(this.id());
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}
