import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RCEquipementFormComponent } from '../forms/rc-equipement-form.component';
import { RCEquipementService } from '../services/rc-equipement.service';
import { RCEnginFlottantService } from '../../rc-engin-flottant/services/rc-engin-flottant.service';
import { RCEnginFlottantEntity } from '../../rc-engin-flottant/rc-engin-flottant.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-rc-equipement-create',
  imports: [
    ErrorMessagesComponent,
    RCEquipementFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './rc-equipement-create.component.html',
  styleUrl: './rc-equipement-create.component.css'
})
export class RCEquipementCreateComponent {

  @ViewChild(RCEquipementFormComponent) rCEquipementForm!: RCEquipementFormComponent;

  rcEnginFlottants = signal<RCEnginFlottantEntity[]>([]);

  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected rCEquipementService: RCEquipementService,
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
    this.rCEquipementForm.formGroup.setErrors([]);

    try {
      await this.rCEquipementForm.create();
      this.router.navigate([`/rc/rc-equipements`]);
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
