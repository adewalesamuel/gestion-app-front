import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { INPlanificationFormComponent } from '../forms/in-planification-form.component';
import { INPlanificationService } from '../services/in-planification.service';
import { RCEnginFlottantService } from '../../../RC/rc-engin-flottant/services/rc-engin-flottant.service';
import { RCEnginFlottantEntity } from '../../../RC/rc-engin-flottant/rc-engin-flottant.entity';
import { INChecklistService } from '../../../IN/in-checklist/services/in-checklist.service';
import { INChecklistEntity } from '../../../IN/in-checklist/in-checklist.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-in-planification-create',
  imports: [
    ErrorMessagesComponent,
    INPlanificationFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './in-planification-create.component.html',
  styleUrl: './in-planification-create.component.css'
})
export class INPlanificationCreateComponent {

  @ViewChild(INPlanificationFormComponent) iNPlanificationForm!: INPlanificationFormComponent;

  rcEnginFlottants = signal<RCEnginFlottantEntity[]>([]);
	inChecklists = signal<INChecklistEntity[]>([]);

  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected iNPlanificationService: INPlanificationService,
    protected rcEnginFlottantService: RCEnginFlottantService,
		protected inChecklistService: INChecklistService,

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

			const inChecklistResponse = await this.inChecklistService.getAll({page: ''});
			const inChecklistData = inChecklistResponse.data as INChecklistEntity[];
			this.inChecklists.set(inChecklistData);


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
    this.iNPlanificationForm.formGroup.setErrors([]);

    try {
      await this.iNPlanificationForm.create();
      this.router.navigate([`/in/in-planifications`]);
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
