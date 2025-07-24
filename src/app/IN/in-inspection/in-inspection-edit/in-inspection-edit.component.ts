import { Component, signal, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { INInspectionFormComponent } from '../forms/in-inspection-form.component';
import { INInspectionService } from '../services/in-inspection.service';
import { INInspectionEntity } from '../in-inspection.entity';
import { INTypeControleService } from '../../../IN/in-type-controle/services/in-type-controle.service';
import { INTypeControleEntity } from '../../../IN/in-type-controle/in-type-controle.entity';
import { INEquipeInspectionService } from '../../../IN/in-equipe-inspection/services/in-equipe-inspection.service';
import { INEquipeInspectionEntity } from '../../../IN/in-equipe-inspection/in-equipe-inspection.entity';
import { RCEnginFlottantService } from '../../../RC/rc-engin-flottant/services/rc-engin-flottant.service';
import { RCEnginFlottantEntity } from '../../../RC/rc-engin-flottant/rc-engin-flottant.entity';
import { UserService } from '../../../common-features/user/services/user.service';
import { UserEntity } from '../../../common-features/user/user.entity';

import { Response } from '../../../types';
import { ErrorHandlerService } from '../../../services/error-handler/error-handler.service';
import { ErrorMessagesComponent } from '../../../ui/error-messages/error-messages.component';

@Component({
  standalone: true,
  selector: 'app-in-inspection-edit',
  imports: [
    ErrorMessagesComponent,
    INInspectionFormComponent
  ],
  providers: [ErrorHandlerService],
  templateUrl: './in-inspection-edit.component.html',
  styleUrl: './in-inspection-edit.component.css'
})
export class INInspectionEditComponent {
  @ViewChild(INInspectionFormComponent) iNInspectionForm!: INInspectionFormComponent;

  id = signal<number>(1);
  iNInspection = signal<INInspectionEntity|null>(null)
  inTypeControles = signal<INTypeControleEntity[]>([]);
	inEquipeInspections = signal<INEquipeInspectionEntity[]>([]);
	rcEnginFlottants = signal<RCEnginFlottantEntity[]>([]);
	users = signal<UserEntity[]>([]);

  isLoading = signal<boolean>(true);

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    protected iNInspectionService: INInspectionService,
    protected inTypeControleService: INTypeControleService,
		protected inEquipeInspectionService: INEquipeInspectionService,
		protected rcEnginFlottantService: RCEnginFlottantService,
		protected userService: UserService,

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
      const iNInspectionResponse = await this.iNInspectionService.getById(this.id())
      const iNInspectionData = iNInspectionResponse.data as INInspectionEntity;

      this.iNInspection.set(iNInspectionData);
      this.iNInspectionForm.fill(iNInspectionData);

      const inTypeControleResponse = await this.inTypeControleService.getAll({page: ''});
			const inTypeControleData = inTypeControleResponse.data as INTypeControleEntity[];
			this.inTypeControles.set(inTypeControleData);

			const inEquipeInspectionResponse = await this.inEquipeInspectionService.getAll({page: ''});
			const inEquipeInspectionData = inEquipeInspectionResponse.data as INEquipeInspectionEntity[];
			this.inEquipeInspections.set(inEquipeInspectionData);

			const rcEnginFlottantResponse = await this.rcEnginFlottantService.getAll({page: ''});
			const rcEnginFlottantData = rcEnginFlottantResponse.data as RCEnginFlottantEntity[];
			this.rcEnginFlottants.set(rcEnginFlottantData);

			const userResponse = await this.userService.getAll({page: ''});
			const userData = userResponse.data as UserEntity[];
			this.users.set(userData);


    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async handleFormSubmit (e: Event) {
    e.preventDefault();

    this.isLoading.set(true);
    this.iNInspectionForm.formGroup.setErrors([]);
    this.errorHandler.setErrorMessages([]);

    try {
      await this.iNInspectionForm.update(this.id());
    } catch (error) {
      this.errorHandler.setError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

}
