import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RCEquipementFormComponent } from '../forms/rc-equipement-form.component';
import { RCEquipementService } from '../services/rc-equipement.service';
import { RCEquipementEntity } from '../rc-equipement.entity';
import { RCEnginFlottantService } from '../../rc-engin-flottant/services/rc-engin-flottant.service';
import { RCEnginFlottantEntity } from '../../rc-engin-flottant/rc-engin-flottant.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-rc-equipement-edit',
  imports: [
    ErrorMessagesComponent,
    RCEquipementFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './rc-equipement-edit.component.html',
  styleUrl: './rc-equipement-edit.component.css'
})
export class RCEquipementEditComponent {
  @ViewChild(RCEquipementFormComponent) rCEquipementForm!: RCEquipementFormComponent;

  id = signal<number>(1);
  rCEquipement = signal<RCEquipementEntity|null>(null)
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

    this.route.params.subscribe(async params => {
      this.id.set(Number(params['id']));
      this.init();
    });
  }

  async init() {
    this.isLoading.set(true);

    try {
      const rCEquipementResponse = await this.rCEquipementService.getById(this.id())
      const rCEquipementData = rCEquipementResponse.data as RCEquipementEntity;

      this.rCEquipement.set(rCEquipementData);
      this.rCEquipementForm.fill(rCEquipementData);

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
    this.rCEquipementForm.formGroup.setErrors([]);
    this.errorHandler.setErrorMessages([]);

    try {
      await this.rCEquipementForm.update(this.id());
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}
